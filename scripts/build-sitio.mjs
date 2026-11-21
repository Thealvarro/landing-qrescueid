// Empaqueta el sitio estático (sitio/) hacia public/ antes de astro build.
// - JS: módulos ES de sitio/js → public/js, minificados y con chunks compartidos
//   (cada módulo se evalúa una sola vez aunque una página cargue varios scripts).
// - CSS: sitio/css y lenis.css → public/css, minificados.
// - Fuente Inter variable → public/fonts/inter (servida desde el mismo dominio).
// La salida (public/js, public/css, public/fonts) no se versiona: se genera en cada build.
import { build } from 'esbuild';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const ENTRADAS = ['sitio', 'v2', 'v2-hero-carga', 'tienda', 'checkout', 'pedido', 'empresas'];
const CSS = ['v2', 'sitio-nav', 'sitio', 'paginas', 'checkout'];

for (const dir of ['public/js', 'public/css', 'public/fonts']) rmSync(dir, { recursive: true, force: true });

await build({
  entryPoints: ENTRADAS.map(n => `sitio/js/${n}.js`),
  outdir: 'public/js',
  bundle: true,
  splitting: true,
  format: 'esm',
  minify: true,
  target: 'es2020',
  chunkNames: 'chunks/[name]-[hash]',
  sourcemap: 'linked', // .map junto a cada archivo (solo lo pide DevTools; es código del frontend)
  legalComments: 'none',
  logLevel: 'warning',
});

// Script clásico y diminuto al inicio del <body>: reserva el espacio de la franja de preventa
// antes del primer pintado (sin esto el contenido salta al aparecer la franja).
await build({
  entryPoints: ['sitio/js/franja-temprana.js'],
  outdir: 'public/js',
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2020',
  legalComments: 'none',
  logLevel: 'warning',
});

await build({
  entryPoints: [...CSS.map(n => `sitio/css/${n}.css`), { in: 'node_modules/lenis/dist/lenis.css', out: 'lenis' }],
  outdir: 'public/css',
  minify: true,
  logLevel: 'warning',
});

// Inter variable (eje opsz, normal): mismas caras que @fontsource-variable/inter/opsz.css
const fuente = 'node_modules/@fontsource-variable/inter';
mkdirSync('public/fonts/inter', { recursive: true });
const css = readFileSync(`${fuente}/opsz.css`, 'utf8');
for (const [, archivo] of css.matchAll(/url\(\.\/files\/([^)]+)\)/g)) {
  cpSync(`${fuente}/files/${archivo}`, `public/fonts/inter/${archivo}`);
}
writeFileSync('public/fonts/inter/inter.css', css.replaceAll('url(./files/', 'url(/fonts/inter/'));

// CSS unido por tipo de página: una sola hoja que bloquea el render en vez de cuatro o cinco.
// Mismo contenido y mismo orden que los <link> sueltos que reemplaza (los sueltos se siguen generando).
const UNIDOS = {
  home: ['public/fonts/inter/inter.css', 'public/css/lenis.css', 'sitio/css/v2.css', 'sitio/css/sitio-nav.css'],
  'paginas-todo': ['public/fonts/inter/inter.css', 'public/css/lenis.css', 'sitio/css/sitio.css', 'sitio/css/sitio-nav.css', 'sitio/css/paginas.css'],
};
for (const [nombre, hojas] of Object.entries(UNIDOS)) {
  await build({
    stdin: { contents: hojas.map(h => `@import "./${h}";`).join('\n'), resolveDir: '.', loader: 'css' },
    outfile: `public/css/${nombre}.css`,
    bundle: true,
    minify: true,
    external: ['/fonts/*', '/assets/*'],
    logLevel: 'warning',
  });
}

console.log('[build-sitio] listo: public/js, public/css, public/fonts');
