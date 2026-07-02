import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/content/how-to-buy-old.astro
var how_to_buy_old_exports = /* @__PURE__ */ __exportAll({
	default: () => $$HowToBuyOld,
	file: () => $$file,
	url: () => $$url
});
var $$HowToBuyOld = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Cara Pemesanan" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-800 mb-4">Manage Cara Pemesanan</h1><p class="text-gray-600 mb-6">Edit subtitle and manage steps for the "How To Buy" section.</p><form id="how-to-buy-form" class="space-y-6 max-w-2xl"><!-- Subtitle --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="subtitle" class="block text-sm font-medium text-gray-700 mb-1">Subtitle (ID)</label><textarea id="subtitle" name="subtitle" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Proses mudah dan transparan..."></textarea></div><div><label for="subtitle_en" class="block text-sm font-medium text-gray-700 mb-1">Subtitle (EN)</label><textarea id="subtitle_en" name="subtitle_en" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Easy and transparent process..."></textarea></div></div><div><div class="flex justify-between items-center mb-4"><label class="block text-sm font-medium text-gray-700">Steps</label><button type="button" id="add-step-btn" class="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">+ Add Step</button></div><div id="steps-container" class="space-y-4"></div></div><div class="pt-4 border-t"><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Simpan Perubahan</button></div></form></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/how-to-buy-old.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/how-to-buy-old.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/how-to-buy-old.astro";
var $$url = "/admin/content/how-to-buy-old";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/how-to-buy-old@_@astro
var page = () => how_to_buy_old_exports;
//#endregion
export { page };
