

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.95b22a15.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.60f6f871.js"];
export const stylesheets = [];
export const fonts = [];
