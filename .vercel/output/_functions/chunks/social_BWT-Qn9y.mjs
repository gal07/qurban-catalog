import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$DynamicList } from "./DynamicList_BOnZ_D7C.mjs";
//#region src/pages/admin/content/social.astro
var social_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Social,
	file: () => $$file,
	url: () => $$url
});
var $$Social = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Ikuti Kami" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Social Media",
		"description": "Add and manage social media links displayed in the footer",
		"icon": "🔗"
	})}${maybeRenderHead($$result)}<form id="social-form">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Social Media Links",
		"description": "Manage your social media presence"
	}, { "default": ($$result) => renderTemplate`<div id="social-list-container">${renderComponent($$result, "DynamicList", $$DynamicList, {
		"title": "Links",
		"addButtonText": "+ Add Social Media",
		"emptyMessage": "No social links yet. Click the button above to add one."
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/social.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/social.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/social.astro";
var $$url = "/admin/content/social";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/social@_@astro
var page = () => social_exports;
//#endregion
export { page };
