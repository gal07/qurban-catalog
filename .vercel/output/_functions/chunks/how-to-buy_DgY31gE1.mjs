import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$LocalizedInput } from "./LocalizedInput_DhS279JU.mjs";
import { t as $$DynamicList } from "./DynamicList_BOnZ_D7C.mjs";
//#region src/pages/admin/content/how-to-buy.astro
var how_to_buy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$HowToBuy,
	file: () => $$file,
	url: () => $$url
});
var $$HowToBuy = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Cara Pemesanan" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Cara Pemesanan",
		"description": "Edit subtitle and manage steps for the 'How To Buy' section",
		"icon": "📋"
	})}${maybeRenderHead($$result)}<form id="how-to-buy-form">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Subtitle",
		"description": "Section subtitle text"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "subtitle",
		"labelId": "Subtitle (ID)",
		"labelEn": "Subtitle (EN)",
		"type": "textarea",
		"placeholderId": "Proses mudah dan transparan...",
		"placeholderEn": "Easy and transparent process...",
		"rows": 2
	})}` })}${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Steps",
		"description": "Manage ordering steps",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`<div id="steps-list-container">${renderComponent($$result, "DynamicList", $$DynamicList, {
		"addButtonText": "+ Add Step",
		"emptyMessage": "No steps yet. Click the button above to add one."
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/how-to-buy.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/how-to-buy.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/how-to-buy.astro";
var $$url = "/admin/content/how-to-buy";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/how-to-buy@_@astro
var page = () => how_to_buy_exports;
//#endregion
export { page };
