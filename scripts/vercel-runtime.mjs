// @astrojs/vercel 7 (el último compatible con Astro 4) solo conoce Node 18 y 20,
// y con cualquier otra versión deja las funciones en nodejs18.x, que Vercel ya
// no acepta. Esto fija el runtime a Node 24 después del build.
// Se puede borrar al migrar a Astro 5 + @astrojs/vercel 8 o superior.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = '.vercel/output/functions';
if (existsSync(dir)) {
  for (const fn of readdirSync(dir)) {
    const file = `${dir}/${fn}/.vc-config.json`;
    if (!existsSync(file)) continue;
    const config = JSON.parse(readFileSync(file, 'utf8'));
    config.runtime = 'nodejs24.x';
    writeFileSync(file, JSON.stringify(config, null, 2));
    console.log(`[vercel-runtime] ${fn}: nodejs24.x`);
  }
}
