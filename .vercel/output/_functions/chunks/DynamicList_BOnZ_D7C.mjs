import { C as createAstro, _ as addAttribute, c as renderSlot, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
//#region src/components/admin/forms/DynamicList.astro
createAstro("https://astro.build");
var $$DynamicList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$DynamicList;
	const { title, description, addButtonText = "Add Item", emptyMessage = "No items yet. Click the button above to add one.", class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`dynamic-list ${className}`, "class")}>${(title || description) && renderTemplate`<div class="list-header mb-4">${title && renderTemplate`<h3 class="text-lg font-semibold text-slate-900">${title}</h3>`}${description && renderTemplate`<p class="text-sm text-slate-600 mt-1">${description}</p>`}</div>`}<div class="list-actions mb-4"><button type="button" class="add-item-btn inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>${addButtonText}</button></div><div class="list-items space-y-4"><!-- Items will be dynamically inserted here -->${renderSlot($$result, $$slots["items"])}</div><div class="empty-state hidden text-center py-8 text-slate-500"><svg class="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg><p>${emptyMessage}</p></div></div>${renderScript($$result, "/tmp/qc-fix/src/components/admin/forms/DynamicList.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/admin/forms/DynamicList.astro", void 0);
//#endregion
export { $$DynamicList as t };
