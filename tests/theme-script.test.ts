import { expect, test } from "bun:test";

const outputUrl = new URL("../dist/index.html", import.meta.url);

type Theme = "dark" | "light";
type Listener = () => void;

interface ScenarioOptions {
  reducedMotion?: boolean;
  startViewTransition?: boolean;
  storedTheme?: Theme | null;
}

async function readThemeScript(): Promise<string> {
  const html = await Bun.file(outputUrl).text();
  return (
    html.match(
      /<script\b[^>]*data-theme-script[^>]*>([\s\S]*?)<\/script>/i,
    )?.[1] ?? ""
  );
}

function runThemeScript(script: string, options: ScenarioOptions = {}) {
  const documentListeners = new Map<string, Listener>();
  const inputListeners = new Map<string, Listener>();
  const storedValues = new Map<string, string>();
  const styleValues = new Map<string, string>();
  const animations: Array<{
    keyframes: { clipPath: string[] };
    options: { duration: number; easing: string; pseudoElement: string };
  }> = [];
  const root = {
    dataset: {} as Record<string, string>,
    style: {
      setProperty(name: string, value: string) {
        styleValues.set(name, value);
      },
    },
    animate(
      keyframes: { clipPath: string[] },
      animationOptions: {
        duration: number;
        easing: string;
        pseudoElement: string;
      },
    ) {
      animations.push({ keyframes, options: animationOptions });
    },
  };
  const input = {
    checked: false,
    addEventListener(type: string, listener: Listener) {
      inputListeners.set(type, listener);
    },
    getBoundingClientRect() {
      return { left: 8, top: 8, width: 1, height: 1 };
    },
  };
  const label = {
    getBoundingClientRect() {
      return { left: 280, top: 390, width: 40, height: 20 };
    },
  };
  const themeColor = {
    content: "#0b0b0e",
    setAttribute(_name: string, value: string) {
      this.content = value;
    },
  };
  const localStorage = {
    getItem(key: string) {
      return storedValues.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      storedValues.set(key, value);
    },
  };
  if (options.storedTheme) {
    storedValues.set("edzon-portfolio-theme", options.storedTheme);
  }

  let transitionCalls = 0;
  let transitionUpdate: Listener | undefined;
  const document = {
    documentElement: root,
    querySelector(selector: string) {
      if (selector === "#theme-toggle") return input;
      if (selector === 'label[for="theme-toggle"]') return label;
      if (selector === 'meta[name="theme-color"]') return themeColor;
      return null;
    },
    startViewTransition:
      options.startViewTransition === false
        ? undefined
        : (update: Listener) => {
            transitionCalls += 1;
            transitionUpdate = update;
            return { ready: Promise.resolve() };
          },
  };
  const window = {
    addEventListener(type: string, listener: Listener) {
      documentListeners.set(type, listener);
    },
    matchMedia() {
      return { matches: options.reducedMotion ?? false };
    },
  };

  new Function(
    "window",
    "document",
    "localStorage",
    "innerWidth",
    "innerHeight",
    script,
  )(window, document, localStorage, 600, 800);

  return {
    animations,
    documentListeners,
    input,
    inputListeners,
    root,
    storedValues,
    styleValues,
    themeColor,
    get transitionCalls() {
      return transitionCalls;
    },
    runTransitionUpdate() {
      transitionUpdate?.();
      transitionUpdate = undefined;
    },
  };
}

test("initializes a stored light theme before syncing the checkbox", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");

  const scenario = runThemeScript(script, { storedTheme: "light" });

  expect(scenario.root.dataset.theme).toBe("light");
  expect(scenario.themeColor.content).toBe("#f4f1eb");
  expect(scenario.input.checked).toBe(false);

  scenario.documentListeners.get("DOMContentLoaded")?.();

  expect(scenario.input.checked).toBe(true);
  expect(scenario.transitionCalls).toBe(0);
});

test("persists a theme change inside a circular view transition", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");
  const scenario = runThemeScript(script);
  scenario.documentListeners.get("DOMContentLoaded")?.();

  scenario.input.checked = true;
  scenario.inputListeners.get("change")?.();

  expect(scenario.transitionCalls).toBe(1);
  expect(scenario.root.dataset.theme).toBe("dark");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBeUndefined();
  scenario.runTransitionUpdate();
  await Promise.resolve();

  expect(scenario.root.dataset.theme).toBe("light");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBe("light");
  expect(scenario.styleValues.get("--theme-x")).toBe("300px");
  expect(scenario.styleValues.get("--theme-y")).toBe("400px");
  expect(scenario.styleValues.get("--theme-radius")).toBe("500px");
  expect(scenario.animations).toEqual([
    {
      keyframes: {
        clipPath: [
          "circle(0px at 300px 400px)",
          "circle(500px at 300px 400px)",
        ],
      },
      options: {
        duration: 320,
        easing: "ease-out",
        pseudoElement: "::view-transition-new(root)",
      },
    },
  ]);
});

test("applies changes instantly when transitions are reduced or unsupported", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");

  for (const options of [
    { reducedMotion: true },
    { startViewTransition: false },
  ]) {
    const scenario = runThemeScript(script, options);
    scenario.documentListeners.get("DOMContentLoaded")?.();
    scenario.input.checked = true;
    scenario.inputListeners.get("change")?.();

    expect(scenario.root.dataset.theme).toBe("light");
    expect(scenario.storedValues.get("edzon-portfolio-theme")).toBe("light");
    expect(scenario.transitionCalls).toBe(0);
    expect(scenario.animations).toHaveLength(0);
  }
});
