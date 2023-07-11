

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.019cb005.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.60f6f871.js"];
export const stylesheets = [];
export const fonts = [];
