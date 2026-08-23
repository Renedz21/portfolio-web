import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const legacyPaths = [
  "app",
  "components",
  "data",
  "hooks",
  "lib",
  "next-env.d.ts",
  "next.config.ts",
  "postcss.config.mjs",
  "seo.config.ts",
  "public/file.svg",
  "public/globe.svg",
  "public/next.svg",
  "public/vercel.svg",
  "public/window.svg",
];

const protectedPaths = [
  "astro.config.mjs",
  "public/favicon.svg",
  "public/robots.txt",
  "src",
  "tests",
];

function projectPath(relativePath: string): string {
  return fileURLToPath(new URL(relativePath, new URL("../", import.meta.url)));
}

describe("Astro migration cleanup", () => {
  test("removes the approved legacy implementation and keeps Astro assets", () => {
    for (const relativePath of legacyPaths) {
      expect(existsSync(projectPath(relativePath)), relativePath).toBe(false);
    }

    for (const relativePath of protectedPaths) {
      expect(existsSync(projectPath(relativePath)), relativePath).toBe(true);
    }
  });

  test("exposes only Astro commands without Next, React, or Motion dependencies", () => {
    const packageJson = JSON.parse(
      readFileSync(projectPath("package.json"), "utf8"),
    ) as {
      scripts: Record<string, string>;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
      optionalDependencies?: Record<string, string>;
    };
    const dependencyNames = Object.keys({
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
      ...packageJson.optionalDependencies,
    });

    expect(packageJson.scripts).toMatchObject({
      dev: "astro dev",
      build: "astro check && astro build",
      preview: "astro preview",
      validate: "bun run check && bun run build && bun run test",
    });
    expect(Object.values(packageJson.scripts).join("\n")).not.toMatch(
      /(?:^|\s)next(?:\s|$)/i,
    );
    expect(dependencyNames).not.toContain("next");
    expect(dependencyNames).not.toContain("react");
    expect(dependencyNames).not.toContain("react-dom");
    expect(dependencyNames).not.toContain("motion");
    expect(dependencyNames).not.toContain("framer-motion");
  });

  test("keeps the Bun lockfile free of removed framework packages", () => {
    const lockfile = readFileSync(projectPath("bun.lock"), "utf8");

    for (const dependency of [
      "next",
      "react",
      "react-dom",
      "motion",
      "framer-motion",
    ]) {
      expect(lockfile, dependency).not.toContain(`"${dependency}"`);
    }
  });
});
