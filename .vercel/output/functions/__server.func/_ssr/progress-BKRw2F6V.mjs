import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B-tb0t5S.mjs";
import { a as literalType, c as recordType, i as enumType, l as stringType, n as booleanType, o as numberType, s as objectType, t as arrayType, u as unknownType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as createSsrRpc } from "./createSsrRpc-QYZFi3Fq.mjs";
import { r as cn } from "./input-BrmI0Glv.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-BKRw2F6V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var uuid = stringType().uuid();
/** Client-facing Command Center payload: profile, roles, project, and full domain entities. */
var getMyPortal = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("39e345df0bfc5f09ce24a836ecfce95be907956f26ff1aedf8ca6db1bc35d35c"));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	fullName: stringType().trim().max(120).optional(),
	company: stringType().trim().max(120).optional(),
	phone: stringType().trim().max(32).optional(),
	timezone: stringType().trim().max(60).optional()
}).parse(data)).handler(createSsrRpc("3356e8e7f455f9d8292f00dc441138f0439b0e992ba1d12d5fd2ccfeb7bc4556"));
/** Client requirement submission with monotonic versioning. */
var submitRequirement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	body: stringType().trim().max(8e3).optional(),
	files: arrayType(recordType(stringType(), unknownType())).max(20).default([])
}).parse(data)).handler(createSsrRpc("d936452e0ee8753a5925490c28c6d4387468a729ce1b8cf14b2914759adc4595"));
/** Client enhancement request. */
var requestEnhancement = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	description: stringType().trim().max(5e3).optional(),
	priority: enumType([
		"low",
		"medium",
		"high",
		"urgent"
	]).default("medium")
}).parse(data)).handler(createSsrRpc("0c80008bfa05f602e0ced731d640f238b8f449a053e82832e68d28b86fdcf924"));
/** Comment on an enhancement thread. */
var addEnhancementComment = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	enhancementId: uuid,
	body: stringType().trim().min(1).max(3e3)
}).parse(data)).handler(createSsrRpc("f12841421d30384f3d416bfdd0fa30c5fa85da3d30427374413c44e1ca805aa6"));
/** Client issue report. */
var reportIssue = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	detail: stringType().trim().max(5e3).optional(),
	severity: enumType([
		"low",
		"medium",
		"high",
		"critical"
	]).default("medium"),
	attachments: arrayType(recordType(stringType(), unknownType())).max(10).default([])
}).parse(data)).handler(createSsrRpc("077766b0ef5f7bf5816bc56db9e312de991615329a5cdd9bdf4eff1bd2a43983"));
/** Reply to an issue thread. */
var replyToIssue = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	issueId: uuid,
	body: stringType().trim().min(1).max(3e3),
	attachments: arrayType(recordType(stringType(), unknownType())).max(10).default([])
}).parse(data)).handler(createSsrRpc("e987ed5df71ce87f07449e74f488ef835a88f8ecb7364770f753f6e2a6df51b8"));
/** Notification read state update. */
var markNotificationRead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	notificationId: uuid.optional(),
	markAll: booleanType().optional()
}).parse(data)).handler(createSsrRpc("929abc5bfe7fa736766b074edbd38d4fbf72690f6a62baa45e0bd25a91d68884"));
/** Password change with strength and history checks. */
var updateClientPassword = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ newPassword: stringType().min(8).max(128) }).parse(data)).handler(createSsrRpc("ac2482f22f8f24e475219124a31a14b182d2472093292eb61529aaa636d69742"));
/** Revoke an active session. */
var revokeClientSession = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({ sessionId: uuid }).parse(data)).handler(createSsrRpc("c4a28126973948f558e314bdaf6387daff6efb321291a8be7d732a28a5c0ba37"));
/** Admin console payload — RLS only returns these rows for admins. */
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("18a027eac446a11856883e0cc9139471cf91e3466cba3990c4ab49d139743945"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	id: uuid.optional(),
	clientId: uuid,
	name: stringType().trim().min(2).max(120),
	summary: stringType().trim().max(600).optional(),
	platforms: arrayType(stringType().trim().max(30)).max(8).default([]),
	status: stringType().trim().max(40).default("discovery"),
	progress: numberType().int().min(0).max(100).default(0),
	launchDate: stringType().trim().max(20).optional()
}).parse(data)).handler(createSsrRpc("a6cccf86d498665f34f9a198cba5c74633fb8df0f0e946b5731f13f4d2323ca4"));
var setProjectProgress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	progress: numberType().int().min(0).max(100),
	status: stringType().trim().max(40).optional()
}).parse(data)).handler(createSsrRpc("3050454e876f141c396136f716cf38c3e0a59e913f6197eb4ad5c18933975b7e"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	title: stringType().trim().min(2).max(140),
	detail: stringType().trim().max(600).optional(),
	status: stringType().trim().max(30).default("pending"),
	dueDate: stringType().trim().max(20).optional(),
	position: numberType().int().min(0).max(200).default(0)
}).parse(data)).handler(createSsrRpc("7c36c0b533aa99c8f4fca76d503b59ff93f4e055f6537d3d9f8899291ec7af6b"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	table: enumType([
		"project_milestones",
		"project_issues",
		"project_payments"
	]),
	id: uuid,
	status: stringType().trim().min(2).max(30)
}).parse(data)).handler(createSsrRpc("3cf619cc07f1832aac3629fb25db73ab03fbb78359ad72d1c5d796e3995d416b"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	projectId: uuid,
	label: stringType().trim().min(2).max(120),
	kind: stringType().trim().max(20).default("apk"),
	version: stringType().trim().max(30).optional(),
	downloadUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	githubUrl: stringType().trim().url().max(300).optional().or(literalType("")),
	apkUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	ipaUrl: stringType().trim().url().max(500).optional().or(literalType("")),
	documentationUrl: stringType().trim().url().max(500).optional().or(literalType(""))
}).parse(data)).handler(createSsrRpc("cb51855124cd329b17a66359762c663fd5e666b8c575a819c0b1f6de3a6fdb9d"));
var setDeliveryLock = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
	id: uuid,
	unlocked: booleanType()
}).parse(data)).handler(createSsrRpc("3c326af79982f127f69f1260d8cdf3954700f24ef977c2d65f00d18a14b47298"));
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
//#endregion
export { markNotificationRead as a, requestEnhancement as c, setProjectProgress as d, submitRequirement as f, getMyPortal as i, revokeClientSession as l, updateMyProfile as m, addEnhancementComment as n, replyToIssue as o, updateClientPassword as p, getAdminOverview as r, reportIssue as s, Progress as t, setDeliveryLock as u };
