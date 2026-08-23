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

test("renders the complete personal identity and contact paths", async () => {
  const html = await readOutput("dist/index.html");

  expect(html.match(/<h1\b/g)).toHaveLength(1);
  expect(html).toContain("Edzon");
  expect(html).toContain("Perez");
  expect(html).toContain("Fullstack Engineer · Lima, Perú");
  expect(html).toContain(
    "Desarrollo productos digitales que resuelven problemas reales con precisión técnica y simplicidad.",
  );
  expect(html).toContain("Disponible para nuevos proyectos");
  expect(html).toContain(
    "Soy Edzon, desarrollador fullstack. Construyo productos claros y agradables de usar, con experiencias fluidas que resuelven problemas sin complicar la vida.",
  );
  for (const skill of [
    "React / Next.js",
    "TypeScript",
    "Node.js / NestJS",
    "PostgreSQL / Supabase",
    "Tailwind CSS",
  ]) {
    expect(html).toContain(`<li>${skill}</li>`);
  }
  expect(html).toContain('href="mailto:edzonperez.castillo@gmail.com"');
  for (const [label, url] of [
    ["GitHub", "https://github.com/Renedz21"],
    [
      "LinkedIn",
      "https://www.linkedin.com/in/brad-edzon-perez-castillo-5342b1205/",
    ],
  ]) {
    expect(html).toContain(
      `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label} (abre en una pestaña nueva)">`,
    );
  }
  expect(html).toContain('href="#contenido">Saltar al contenido</a>');
});

test("renders an accessible CSS-only theme selector", async () => {
  const html = await readOutput("dist/index.html");

  expect(html).toContain(
    '<input type="checkbox" id="theme-toggle" role="switch" aria-label="Modo claro"',
  );
  expect(html).toContain('for="theme-toggle"');
  expect(html).toContain('class="theme-option theme-option-sun"');
  expect(html).toContain('class="theme-option theme-option-moon"');
  expect(html).not.toMatch(/<script\b/i);
});

test("renders four semantic project links with temporary visuals", async () => {
  const html = await readOutput("dist/index.html");
  const expectedUrls = [
    "https://www.konti.dev/",
    "https://que-como.vercel.app/",
    "https://inkyra.app/",
    "https://quipu-finance.app/",
  ];

  expect(html.match(/<article class="project-card"/g)).toHaveLength(4);
  expect(html.match(/<h2\b/g)).toHaveLength(4);
  expect(html.match(/PROJECT VISUAL — COMING SOON/g)).toHaveLength(4);

  for (const url of expectedUrls) {
    expect(html).toContain('href="' + url + '"');
  }

  expect(html).toContain('target="_blank"');
  expect(html).toContain('rel="noopener noreferrer"');
  expect(html).toContain("abre en una pestaña nueva");
});
