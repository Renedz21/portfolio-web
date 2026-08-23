import { expect, test } from "bun:test";

const outputUrl = new URL("../dist/index.html", import.meta.url);

type Theme = "dark" | "light";
type Listener = () => void;

interface PendingTransition {
  update: Listener;
  resolveFinished: Listener;
  resolveReady: Listener;
}

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
  const animationFrameCallbacks: Listener[] = [];
  const pendingTransitions: PendingTransition[] = [];
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
            let resolveReady = () => {};
            let resolveFinished = () => {};
            const ready = new Promise<void>((resolve) => {
              resolveReady = resolve;
            });
            const finished = new Promise<void>((resolve) => {
              resolveFinished = resolve;
            });
            pendingTransitions.push({
              update,
              resolveFinished,
              resolveReady,
            });
            return { finished, ready };
          },
  };
  const window = {
    addEventListener(type: string, listener: Listener) {
      documentListeners.set(type, listener);
    },
    matchMedia() {
      return { matches: options.reducedMotion ?? false };
    },
    requestAnimationFrame(callback: Listener) {
      animationFrameCallbacks.push(callback);
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
    pendingTransitions,
    root,
    storedValues,
    styleValues,
    themeColor,
    get transitionCalls() {
      return transitionCalls;
    },
    flushAnimationFrames() {
      animationFrameCallbacks.splice(0).forEach((callback) => callback());
    },
    resolveTransitionFinished(index = 0) {
      pendingTransitions[index]?.resolveFinished();
    },
    resolveTransitionReady(index = 0) {
      pendingTransitions[index]?.resolveReady();
    },
    runTransitionUpdate(index = 0) {
      pendingTransitions[index]?.update();
    },
  };
}

test("initializes a stored light theme before syncing the checkbox", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");

  const scenario = runThemeScript(script, { storedTheme: "light" });

  expect(scenario.root.dataset.themeEnhanced).toBe("");
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
  expect(scenario.root.dataset.themeTransitioning).toBe("");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBeUndefined();
  scenario.runTransitionUpdate();
  scenario.resolveTransitionReady();
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
  expect(scenario.root.dataset.themeTransitioning).toBe("");

  scenario.resolveTransitionFinished();
  await Promise.resolve();

  expect(scenario.root.dataset.themeTransitioning).toBeUndefined();
});

test("ignores stale callbacks and cleanup after rapid theme requests", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");
  const scenario = runThemeScript(script);
  scenario.documentListeners.get("DOMContentLoaded")?.();

  scenario.input.checked = true;
  scenario.inputListeners.get("change")?.();
  scenario.input.checked = false;
  scenario.inputListeners.get("change")?.();

  expect(scenario.transitionCalls).toBe(2);
  expect(scenario.root.dataset.themeTransitioning).toBe("");

  scenario.runTransitionUpdate(1);
  scenario.runTransitionUpdate(0);
  scenario.resolveTransitionReady(0);
  await Promise.resolve();

  expect(scenario.root.dataset.theme).toBe("dark");
  expect(scenario.themeColor.content).toBe("#0b0b0e");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBe("dark");
  expect(scenario.input.checked).toBe(false);
  expect(scenario.animations).toHaveLength(0);

  scenario.resolveTransitionFinished(0);
  await Promise.resolve();
  expect(scenario.root.dataset.themeTransitioning).toBe("");

  scenario.resolveTransitionReady(1);
  await Promise.resolve();
  expect(scenario.animations).toHaveLength(1);
  scenario.resolveTransitionFinished(1);
  await Promise.resolve();

  expect(scenario.root.dataset.theme).toBe("dark");
  expect(scenario.themeColor.content).toBe("#0b0b0e");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBe("dark");
  expect(scenario.input.checked).toBe(false);
  expect(scenario.root.dataset.themeTransitioning).toBeUndefined();
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
    expect(scenario.root.dataset.themeTransitioning).toBe("");

    scenario.flushAnimationFrames();

    expect(scenario.root.dataset.themeTransitioning).toBe("");

    scenario.flushAnimationFrames();

    expect(scenario.root.dataset.themeTransitioning).toBeUndefined();
  }
});

test("keeps fallback cleanup revision-safe across two frame callbacks", async () => {
  const script = await readThemeScript();
  expect(script).not.toBe("");
  const scenario = runThemeScript(script, { startViewTransition: false });
  scenario.documentListeners.get("DOMContentLoaded")?.();

  scenario.input.checked = true;
  scenario.inputListeners.get("change")?.();
  scenario.flushAnimationFrames();
  expect(scenario.root.dataset.themeTransitioning).toBe("");

  scenario.input.checked = false;
  scenario.inputListeners.get("change")?.();
  scenario.flushAnimationFrames();

  expect(scenario.root.dataset.theme).toBe("dark");
  expect(scenario.storedValues.get("edzon-portfolio-theme")).toBe("dark");
  expect(scenario.root.dataset.themeTransitioning).toBe("");

  scenario.flushAnimationFrames();

  expect(scenario.root.dataset.themeTransitioning).toBeUndefined();
});
