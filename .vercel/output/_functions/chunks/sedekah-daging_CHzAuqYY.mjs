import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$LocalizedInput } from "./LocalizedInput_DhS279JU.mjs";
import { t as $$DynamicList } from "./DynamicList_BOnZ_D7C.mjs";
//#region src/pages/admin/content/sedekah-daging.astro
var sedekah_daging_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SedekahDaging,
	file: () => $$file,
	url: () => $$url
});
var $$SedekahDaging = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Sedekah Daging" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Sedekah Daging",
		"description": "Edit the content of the Sedekah Daging section",
		"icon": "🥩"
	})}${maybeRenderHead($$result)}<form id="sedekah-form">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Section Header",
		"description": "Badge, title, and description"
	}, { "default": ($$result) => renderTemplate`<div class="space-y-4">${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "badge",
		"labelId": "Badge Text (ID)",
		"labelEn": "Badge Text (EN)",
		"type": "text",
		"placeholderId": "Program Spesial",
		"placeholderEn": "Special Program"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "title",
		"labelId": "Title (ID)",
		"labelEn": "Title (EN)",
		"type": "text",
		"placeholderId": "Sedekah Daging",
		"placeholderEn": "Meat Alms"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "titleHighlight",
		"labelId": "Title Highlight (ID)",
		"labelEn": "Title Highlight (EN)",
		"type": "text",
		"placeholderId": "Sebar Bahagia",
		"placeholderEn": "Spread Happiness"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "description",
		"labelId": "Deskripsi (ID)",
		"labelEn": "Description (EN)",
		"type": "textarea",
		"placeholderId": "Berbagi kebahagiaan dengan daging qurban...",
		"placeholderEn": "Share happiness with qurban meat...",
		"rows": 3
	})}</div>` })}${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Features",
		"description": "Manage program features",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`<div id="features-list-container">${renderComponent($$result, "DynamicList", $$DynamicList, {
		"addButtonText": "+ Add Feature",
		"emptyMessage": "No features yet. Click the button above to add one."
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/sedekah-daging.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/sedekah-daging.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/sedekah-daging.astro";
var $$url = "/admin/content/sedekah-daging";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/sedekah-daging@_@astro
var page = () => sedekah_daging_exports;
//#endregion
export { page };
