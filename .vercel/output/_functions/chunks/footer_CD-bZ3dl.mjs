import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$LocalizedInput } from "./LocalizedInput_DhS279JU.mjs";
//#region src/pages/admin/content/footer.astro
var footer_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Footer,
	file: () => $$file,
	url: () => $$url
});
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Footer Description" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Footer Content",
		"description": "Edit the footer description and copyright text",
		"icon": "📄"
	})}${maybeRenderHead($$result)}<form id="footer-form">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Footer Information",
		"description": "Update footer description and copyright"
	}, { "default": ($$result) => renderTemplate`<div class="space-y-4">${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "description",
		"labelId": "Deskripsi (ID)",
		"labelEn": "Description (EN)",
		"type": "textarea",
		"placeholderId": "Mitra ibadah qurban terpercaya...",
		"placeholderEn": "Trusted qurban worship partner...",
		"required": true,
		"rows": 4,
		"helpText": "Teks ini akan muncul di bawah logo di bagian footer"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "bottom",
		"labelId": "Copyright Text (ID)",
		"labelEn": "Copyright Text (EN)",
		"type": "text",
		"placeholderId": "QurbanBerkah. All rights reserved.",
		"placeholderEn": "QurbanBerkah. All rights reserved.",
		"required": true,
		"helpText": "Teks ini akan muncul setelah tahun di bagian bawah footer"
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/footer.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/footer.astro";
var $$url = "/admin/content/footer";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/footer@_@astro
var page = () => footer_exports;
//#endregion
export { page };
