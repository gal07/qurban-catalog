import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$LocalizedInput } from "./LocalizedInput_DhS279JU.mjs";
import { t as $$DynamicList } from "./DynamicList_BOnZ_D7C.mjs";
//#region src/pages/admin/content/hero.astro
var hero_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Hero,
	file: () => $$file,
	url: () => $$url
});
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "First Screen" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Hero Section",
		"description": "Edit the first screen (Hero) content displayed on the homepage",
		"icon": "🏠"
	})}${maybeRenderHead($$result)}<form id="hero-form">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Hero Content",
		"description": "Badge, title, and description"
	}, { "default": ($$result) => renderTemplate`<div class="space-y-4">${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "badge",
		"labelId": "Badge Text (ID)",
		"labelEn": "Badge Text (EN)",
		"type": "text",
		"placeholderId": "Edisi Idul Adha 2026",
		"placeholderEn": "Eid Al-Adha Edition 2026"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "title",
		"labelId": "Title (ID)",
		"labelEn": "Title (EN)",
		"type": "text",
		"placeholderId": "Qurban Sempurna untuk",
		"placeholderEn": "Perfect Qurban for"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "titleHighlight",
		"labelId": "Title Highlight (ID)",
		"labelEn": "Title Highlight (EN)",
		"type": "text",
		"placeholderId": "Ibadah Terbaik",
		"placeholderEn": "Best Worship"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "description",
		"labelId": "Deskripsi (ID)",
		"labelEn": "Description (EN)",
		"type": "textarea",
		"placeholderId": "Wujudkan ibadah qurban yang sempurna...",
		"placeholderEn": "Realize the perfect qurban worship...",
		"rows": 3
	})}</div>` })}${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Catalog Section",
		"description": "Catalog title and subtitle",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`<div class="space-y-4">${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "catalogTitle",
		"labelId": "Catalog Title (ID)",
		"labelEn": "Catalog Title (EN)",
		"type": "text",
		"placeholderId": "Katalog Hewan Qurban",
		"placeholderEn": "Qurban Animal Catalog"
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "catalogSubtitle",
		"labelId": "Catalog Subtitle (ID)",
		"labelEn": "Catalog Subtitle (EN)",
		"type": "textarea",
		"placeholderId": "Pilih hewan qurban terbaik...",
		"placeholderEn": "Choose the best qurban animal...",
		"rows": 2
	})}</div>` })}${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Features",
		"description": "Manage hero features list",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`<div id="features-list-container">${renderComponent($$result, "DynamicList", $$DynamicList, {
		"addButtonText": "+ Add Feature",
		"emptyMessage": "No features yet. Click the button above to add one."
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/hero.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/hero.astro";
var $$url = "/admin/content/hero";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/hero@_@astro
var page = () => hero_exports;
//#endregion
export { page };
