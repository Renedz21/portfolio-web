import { expect, test } from "bun:test";

const rootUrl = new URL("../", import.meta.url);

async function readOutput(relativePath: string): Promise<string> {
  return Bun.file(new URL(relativePath, rootUrl)).text();
}

test("builds a Spanish static document with complete metadata", async () => {
  const html = await readOutput("dist/index.html");

  expect(html).toContain('<html lang="es">');
  expect(html).toContain("<title>Edzon Perez — Fullstack Engineer</title>");
  expect(html).toContain(
    'name="description" content="Portfolio de Edzon Perez, Fullstack Engineer que crea productos digitales claros, útiles y técnicamente sólidos."',
  );
  expect(html).toContain(
    'rel="canonical" href="https://edzon-dev.vercel.app/"',
  );
  expect(html).toContain('rel="sitemap" href="/sitemap-index.xml"');
  expect(html).not.toMatch(/<script\b/i);
});

test("publishes crawler discovery files", async () => {
  const robots = await readOutput("dist/robots.txt");
  const sitemapIndex = await readOutput("dist/sitemap-index.xml");
  const sitemap = await readOutput("dist/sitemap-0.xml");

  expect(robots).toContain("Allow: /");
  expect(robots).toContain(
    "Sitemap: https://edzon-dev.vercel.app/sitemap-index.xml",
  );
  expect(sitemapIndex).toContain("sitemap-0.xml");
  expect(sitemap).toContain("https://edzon-dev.vercel.app/");
});
