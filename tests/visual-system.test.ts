import { expect, test } from "bun:test";

const stylesheetUrl = new URL("../src/styles/global.css", import.meta.url);

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
  expect(css).toContain(".theme-toggle:focus-visible + .theme-toggle-label");
  expect(css).toContain(
    ".theme-toggle:checked + .theme-toggle-label .theme-option-sun",
  );
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
