import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { l as stringType, s as objectType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-QYZFi3Fq.mjs";
import { i as bookingSchema, n as PACKAGE_ENUM, r as REGION_ENUM } from "./bookings.server-CykFAX5h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.functions-DSq-Qfyj.js
createServerFn({ method: "GET" }).validator((data) => objectType({
	package: PACKAGE_ENUM,
	country: stringType().optional(),
	region: REGION_ENUM.optional()
}).parse(data)).handler(createSsrRpc("c8ecdc913fef5f29fa91b323cae7c77a7f59b0d807f75d26f8bb1b7b346172ce"));
var submitBookingForm = createServerFn({ method: "POST" }).validator((data) => bookingSchema.parse(data)).handler(createSsrRpc("63a24d84285b72bca8cb25caf0e7ff60aca9a4c79ba75fcd84e1e8aa285b2e7c"));
var confirmBookingPayment = createServerFn({ method: "POST" }).validator((data) => objectType({
	bookingId: stringType().uuid(),
	orderId: stringType().min(1),
	paymentId: stringType().min(1),
	signature: stringType().min(1)
}).parse(data)).handler(createSsrRpc("1b85cea4c5b09c4fc201430e3f6f719517359e18baf0d6b62d88fa824945cc48"));
var getAdminBookings = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("4fde07d23f2978e70a2201c6a2504c11b13ed5f5ef8148e8c17444ead339ff57"));
//#endregion
export { getAdminBookings as n, submitBookingForm as r, confirmBookingPayment as t };
