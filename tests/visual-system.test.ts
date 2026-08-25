import { expect, test } from "bun:test";

const stylesheetUrl = new URL("../src/styles/global.css", import.meta.url);

function relativeLuminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first: string, second: string): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

function readToken(block: string, token: string): string {
  const value = block.match(
    new RegExp(`${token}:\\s*(#[0-9a-f]{6});`, "i"),
  )?.[1];

  if (!value) {
    throw new Error(`Missing ${token} token`);
  }

  return value;
}

test("defines the approved dark-first visual tokens", async () => {
  const css = await Bun.file(stylesheetUrl).text();

  expect(css).toContain("--background: #0b0b0e;");
  expect(css).toContain("--text: #f2f2f3;");
  expect(css).toContain("--placeholder: #d4d4d6;");
  expect(css).toContain("--accent: #4d7cff;");
});

test("defines the split, sticky, responsive, and reduced-motion rules", async () => {
  const css = await Bun.file(stylesheetUrl).text();

  expect(css).toContain(
    "grid-template-columns: minmax(20rem, 35fr) minmax(0, 65fr);",
  );
  expect(css).toContain("position: sticky;");
  expect(css).toContain("aspect-ratio: 16 / 10;");
  expect(css).toContain("@media (max-width: 56rem)");
  expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  expect(css).not.toContain("::-webkit-scrollbar");
});

test("defines the CSS-only light theme and segmented switch states", async () => {
  const css = await Bun.file(stylesheetUrl).text();

  expect(css).toContain(
    ':root[data-theme="light"],\n:root:not([data-theme]):has(#theme-toggle:checked) {',
  );
  expect(css).toContain("color-scheme: light;");
  expect(css).toContain("--background: #f4f1eb;");
  expect(css).toContain("--panel: #faf8f4;");
  expect(css).toContain("--surface: #ffffff;");
  expect(css).toContain("--line: #d8d4cc;");
  expect(css).toContain("--text: #171719;");
  expect(css).toContain("--muted: #68686f;");
  expect(css).toContain("--placeholder: #dedee1;");
  expect(css).toContain(':root[data-theme="light"] .theme-option-sun');
  expect(css).toContain(':root[data-theme="light"] .theme-option-moon');
  expect(css).toContain(".theme-toggle:focus-visible + .theme-toggle-label");
  expect(css).toContain(
    ".theme-toggle:checked + .theme-toggle-label .theme-option-sun",
  );
});

test("keeps light-theme accent text and controls at WCAG AA contrast", async () => {
  const css = await Bun.file(stylesheetUrl).text();
  const lightTheme =
    css.match(/:root\[data-theme="light"\],[\s\S]*?\n}/)?.[0] ?? "";
  const accent = readToken(lightTheme, "--accent");

  expect(
    contrastRatio(accent, readToken(lightTheme, "--surface")),
  ).toBeGreaterThanOrEqual(4.5);
  expect(
    contrastRatio(accent, readToken(lightTheme, "--panel")),
  ).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(accent, "#ffffff")).toBeGreaterThanOrEqual(4.5);
});

test("defines restrained interaction and circular reveal rules", async () => {
  const css = await Bun.file(stylesheetUrl).text();

  expect(css).toContain("--theme-x: 50%;");
  expect(css).toContain("--theme-y: 50%;");
  expect(css).toContain("--theme-radius: 0px;");
  expect(css).toContain("::view-transition-new(root)");
  expect(css).toContain("clip-path: circle(");
  expect(css).toContain("180ms ease");
  expect(css).toContain("translate(0.125rem, -0.125rem)");
  expect(css).not.toContain("transition: all");
  expect(css).not.toMatch(/\b(?:scale|blur)\s*\(/);
  expect(css).not.toContain("linear-gradient");
  expect(css).not.toContain("radial-gradient");
  expect(css).toContain("animation: none !important;");
  expect(css).toContain(":root[data-theme-transitioning]\n  :where(");
  expect(css).toContain("  .project-entry,");
  expect(css).toContain(":root:not([data-theme-enhanced])\n  :where(");
  expect(css).toContain("transition-duration: 0ms;");
});

test("stacks the preview status above its heading on narrow screens", async () => {
  const css = await Bun.file(stylesheetUrl).text();

  expect(css).toContain("@media (max-width: 32rem)");
  expect(css).toContain(
    "  .project-preview .project-header {\n    gap: 1rem;\n    flex-direction: column-reverse;\n  }",
  );
  expect(css).toContain(
    "  .project-preview .project-status {\n    align-self: flex-end;\n  }",
  );
  expect(css).not.toContain("  .project-link .project-header {");
});
