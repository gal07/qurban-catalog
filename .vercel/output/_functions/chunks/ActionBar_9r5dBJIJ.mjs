import { C as createAstro, _ as addAttribute, c as renderSlot, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
//#region src/components/admin/layout/PageHeader.astro
createAstro("https://astro.build");
var $$PageHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHeader;
	const { title, description, icon, class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`page-header mb-8 ${className}`, "class")}><div class="flex items-start justify-between"><div class="flex items-start gap-4">${icon && renderTemplate`<div class="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center"><span class="text-2xl">${icon}</span></div>`}<div><h1 class="text-3xl font-bold text-slate-900">${title}</h1>${description && renderTemplate`<p class="text-slate-600 mt-2">${description}</p>`}</div></div><div class="flex-shrink-0">${renderSlot($$result, $$slots["actions"])}</div></div></div>`;
}, "/tmp/qc-fix/src/components/admin/layout/PageHeader.astro", void 0);
//#endregion
//#region src/components/admin/forms/FormCard.astro
createAstro("https://astro.build");
var $$FormCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FormCard;
	const { title, description, class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`form-card bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`, "class")}>${(title || description) && renderTemplate`<div class="card-header px-6 py-4 border-b border-slate-200 bg-slate-50">${title && renderTemplate`<h3 class="text-lg font-semibold text-slate-900">${title}</h3>`}${description && renderTemplate`<p class="text-sm text-slate-600 mt-1">${description}</p>`}</div>`}<div class="card-body px-6 py-5">${renderSlot($$result, $$slots["default"])}</div></div>`;
}, "/tmp/qc-fix/src/components/admin/forms/FormCard.astro", void 0);
//#endregion
//#region src/components/admin/forms/SaveButton.astro
createAstro("https://astro.build");
var $$SaveButton = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SaveButton;
	const { text = "Simpan Perubahan", loadingText = "Menyimpan...", type = "submit", variant = "primary", disabled = false, class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<button${addAttribute(type, "type")}${addAttribute(disabled, "disabled")}${addAttribute(text, "data-original-text")}${addAttribute(loadingText, "data-loading-text")}${addAttribute(`save-button inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${{
		primary: "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 text-white",
		secondary: "bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 text-white",
		danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
	}[variant]} ${className}`, "class")}><span class="button-text">${text}</span><svg class="button-spinner hidden animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></button>${renderScript($$result, "/tmp/qc-fix/src/components/admin/forms/SaveButton.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/admin/forms/SaveButton.astro", void 0);
//#endregion
//#region src/components/admin/layout/ActionBar.astro
createAstro("https://astro.build");
var $$ActionBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ActionBar;
	const { align = "right", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`action-bar flex items-center gap-3 ${{
		left: "justify-start",
		right: "justify-end",
		between: "justify-between",
		center: "justify-center"
	}[align]} ${className}`, "class")}>${renderSlot($$result, $$slots["default"])}</div>`;
}, "/tmp/qc-fix/src/components/admin/layout/ActionBar.astro", void 0);
//#endregion
export { $$PageHeader as i, $$SaveButton as n, $$FormCard as r, $$ActionBar as t };
