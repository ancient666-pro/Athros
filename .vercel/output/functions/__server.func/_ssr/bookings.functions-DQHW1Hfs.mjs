import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as getRequest } from "./request-response-BDiR3rEX.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { a as createBooking, i as bookingSchema, m as verifyCheckout, n as PACKAGE_ENUM, o as getPriceForPackage, p as trustedRegion, r as REGION_ENUM } from "./bookings.server-CykFAX5h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.functions-DQHW1Hfs.js
var getPackagePrice_createServerFn_handler = createServerRpc({
	id: "c8ecdc913fef5f29fa91b323cae7c77a7f59b0d807f75d26f8bb1b7b346172ce",
	name: "getPackagePrice",
	filename: "src/lib/bookings/bookings.functions.ts"
}, (opts) => getPackagePrice.__executeServer(opts));
var getPackagePrice = createServerFn({ method: "GET" }).validator((data) => objectType({
	package: PACKAGE_ENUM,
	country: stringType().optional(),
	region: REGION_ENUM.optional()
}).parse(data)).handler(getPackagePrice_createServerFn_handler, async ({ data }) => {
	const request = getRequest();
	const region = trustedRegion({
		country: data.country ?? "US",
		region: data.region
	}, request);
	const pricing = await getPriceForPackage(data.package, region);
	return {
		package: pricing.package,
		region: pricing.region,
		currency: pricing.currency,
		fullAmount: pricing.full_amount,
		tokenAmount: pricing.token_amount,
		tokenPercentage: pricing.token_percentage,
		remainingAmount: pricing.full_amount - pricing.token_amount,
		formattedFull: `${pricing.currency} ${(pricing.full_amount / 100).toLocaleString()}`,
		formattedToken: `${pricing.currency} ${(pricing.token_amount / 100).toLocaleString()}`,
		formattedRemaining: `${pricing.currency} ${((pricing.full_amount - pricing.token_amount) / 100).toLocaleString()}`
	};
});
var submitBookingForm_createServerFn_handler = createServerRpc({
	id: "63a24d84285b72bca8cb25caf0e7ff60aca9a4c79ba75fcd84e1e8aa285b2e7c",
	name: "submitBookingForm",
	filename: "src/lib/bookings/bookings.functions.ts"
}, (opts) => submitBookingForm.__executeServer(opts));
var submitBookingForm = createServerFn({ method: "POST" }).validator((data) => bookingSchema.parse(data)).handler(submitBookingForm_createServerFn_handler, async ({ data }) => {
	const request = getRequest();
	if (!request) throw new Error("Request context unavailable");
	return createBooking(data, request, null);
});
var confirmBookingPayment_createServerFn_handler = createServerRpc({
	id: "1b85cea4c5b09c4fc201430e3f6f719517359e18baf0d6b62d88fa824945cc48",
	name: "confirmBookingPayment",
	filename: "src/lib/bookings/bookings.functions.ts"
}, (opts) => confirmBookingPayment.__executeServer(opts));
var confirmBookingPayment = createServerFn({ method: "POST" }).validator((data) => objectType({
	bookingId: stringType().uuid(),
	orderId: stringType().min(1),
	paymentId: stringType().min(1),
	signature: stringType().min(1)
}).parse(data)).handler(confirmBookingPayment_createServerFn_handler, async ({ data }) => {
	if (!await verifyCheckout(data.bookingId, data.orderId, data.paymentId, data.signature)) throw new Error("Payment verification failed");
	return { verified: true };
});
var getAdminBookings_createServerFn_handler = createServerRpc({
	id: "4fde07d23f2978e70a2201c6a2504c11b13ed5f5ef8148e8c17444ead339ff57",
	name: "getAdminBookings",
	filename: "src/lib/bookings/bookings.functions.ts"
}, (opts) => getAdminBookings.__executeServer(opts));
var getAdminBookings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminBookings_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const { data: isStaff } = await supabase.rpc("is_staff", { _user_id: userId });
	if (!isStaff) throw new Error("Forbidden");
	try {
		const { data: bookings } = await supabase.from("project_bookings").select("*").order("created_at", { ascending: false });
		return { bookings: bookings ?? [] };
	} catch {
		return { bookings: [] };
	}
});
//#endregion
export { confirmBookingPayment_createServerFn_handler, getAdminBookings_createServerFn_handler, getPackagePrice_createServerFn_handler, submitBookingForm_createServerFn_handler };
