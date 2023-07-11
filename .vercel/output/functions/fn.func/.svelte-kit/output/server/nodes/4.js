import * as server from '../entries/pages/(studio)/studio/_...slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(studio)/studio/_...slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(studio)/studio/[...slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.cd97539a.js","_app/immutable/chunks/4.0538efa9.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.60f6f871.js","_app/immutable/chunks/preload-helper.cf010ec4.js"];
export const stylesheets = ["_app/immutable/assets/4.6ba77234.css"];
export const fonts = [];
