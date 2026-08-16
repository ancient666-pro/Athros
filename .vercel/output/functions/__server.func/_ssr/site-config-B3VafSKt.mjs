//#region node_modules/.nitro/vite/services/ssr/assets/site-config-B3VafSKt.js
/** Configurable contact + booking endpoints. Override in .env, no code changes needed. */
var siteConfig = {
	bookingUrl: "https://booking.example.com",
	supportPhone: "+91XXXXXXXXXX",
	supportEmail: "support@athros.ai"
};
var telHref = `tel:${siteConfig.supportPhone.replace(/[^\d+]/g, "")}`;
var mailtoHref = `mailto:${siteConfig.supportEmail}`;
//#endregion
export { siteConfig as n, telHref as r, mailtoHref as t };
