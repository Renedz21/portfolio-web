# Portfolio de Edzon Perez

Portfolio personal estático construido con Astro, TypeScript y CSS. El sitio prioriza rendimiento, accesibilidad y una experiencia visual _dark-first_ sin React, Next.js ni librerías de animación.

## Requisitos

- [Bun](https://bun.sh/) 1.4 o superior

## Desarrollo local

Instala las dependencias y levanta el servidor de desarrollo:

```bash
bun install
bun run dev
```

Astro mostrará en la terminal la URL local del proyecto.

## Comandos

```bash
bun run dev       # Inicia Astro en modo desarrollo
bun run build     # Comprueba tipos y genera el sitio estático
bun run preview   # Previsualiza el resultado de producción
bun run test      # Ejecuta las pruebas automatizadas
bun run check     # Comprueba Astro y el formato/lint del proyecto
bun run validate  # Ejecuta todas las verificaciones del proyecto
```

Antes de entregar cambios, ejecuta:

```bash
bun run validate
```

## Estructura principal

- `src/pages/`: páginas y rutas de Astro.
- `src/components/`: componentes estáticos de la interfaz.
- `src/data/`: contenido tipado de los proyectos.
- `src/styles/`: sistema visual global y temas.
- `public/`: recursos publicados sin transformación.
- `tests/`: contratos de datos, salida estática y comportamiento del tema.

El resultado de producción se genera en `dist/` y puede desplegarse en cualquier servicio de alojamiento estático.
