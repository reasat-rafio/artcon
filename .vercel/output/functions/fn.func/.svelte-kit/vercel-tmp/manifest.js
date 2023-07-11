export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.19b22d76.js","app":"_app/immutable/entry/app.e9d2afe1.js","imports":["_app/immutable/entry/start.19b22d76.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/singletons.2a629c83.js","_app/immutable/entry/app.e9d2afe1.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/scheduler.65a4905e.js","_app/immutable/chunks/index.60f6f871.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(studio)/studio/[...slug]",
				pattern: /^\/studio(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
