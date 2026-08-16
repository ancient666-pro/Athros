import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as getRequestHeader } from "./request-response-BDiR3rEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/geo.functions-DnXgtzkw.js
/**
* Server-side region hint. Reads edge geo headers; returns null when unavailable
* so the client can fall back to timezone/locale detection.
*/
var getVisitorRegion_createServerFn_handler = createServerRpc({
	id: "7eb72fa14daaef78218a4e08ad1667aa9abf29ac660934fcc7e30b67f21cec96",
	name: "getVisitorRegion",
	filename: "src/lib/geo.functions.ts"
}, (opts) => getVisitorRegion.__executeServer(opts));
var getVisitorRegion = createServerFn({ method: "GET" }).handler(getVisitorRegion_createServerFn_handler, async () => {
	const country = getRequestHeader("cf-ipcountry") ?? getRequestHeader("x-vercel-ip-country") ?? getRequestHeader("x-country-code") ?? null;
	if (!country || country === "XX" || country.length !== 2) return { country: null };
	return { country: country.toUpperCase() };
});
//#endregion
export { getVisitorRegion_createServerFn_handler };
