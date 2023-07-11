

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dbd60c89.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.60f6f871.js"];
export const stylesheets = ["_app/immutable/assets/2.86f5bc56.css"];
export const fonts = [];
