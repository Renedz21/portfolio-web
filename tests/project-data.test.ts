import { describe, expect, test } from "bun:test";
import { projects } from "../src/data/projects";

const expectedProjects: Array<[string, string]> = [
  ["Konti", "https://www.konti.dev/"],
  ["¿QuéComo?", "https://que-como.vercel.app/"],
  ["Inkyra", "https://inkyra.app/"],
  ["Quipu", "https://quipu-finance.app/"],
] as const;

describe("project data", () => {
  test("preserves the approved order and public destinations", () => {
    expect(projects.map(({ title, url }) => [title, url])).toEqual(
      expectedProjects,
    );
  });

  test("keeps every project complete and image-ready", () => {
    expect(projects).toHaveLength(4);

    for (const project of projects) {
      expect(project.id).toBeGreaterThan(0);
      expect(project.category.length).toBeGreaterThan(0);
      expect(project.description.length).toBeGreaterThan(40);
      expect(project.stack.length).toBeGreaterThanOrEqual(5);
      expect(project.year.length).toBeGreaterThan(0);
      expect(new URL(project.url).protocol).toBe("https:");
      expect(project.image).toBeUndefined();
    }
  });
});
