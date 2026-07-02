import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/content/footer-old.astro
var footer_old_exports = /* @__PURE__ */ __exportAll({
	default: () => $$FooterOld,
	file: () => $$file,
	url: () => $$url
});
var $$FooterOld = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Footer Description" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-800 mb-4">Manage Footer Content</h1><p class="text-gray-600 mb-6">Edit the footer description and copyright text.</p><form id="footer-form" class="space-y-6 max-w-lg"><!-- Description --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="description" class="block text-sm font-medium text-gray-700 mb-1">Deskripsi (ID)</label><textarea id="description" name="description" rows="4" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Mitra ibadah qurban terpercaya..."></textarea></div><div><label for="description_en" class="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label><textarea id="description_en" name="description_en" rows="4" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Trusted qurban worship partner..."></textarea></div></div><p class="text-sm text-gray-500">Teks ini akan muncul di bawah logo di bagian footer.</p><!-- Copyright --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="bottom" class="block text-sm font-medium text-gray-700 mb-1">Copyright Text (ID)</label><input type="text" id="bottom" name="bottom" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="QurbanBerkah. All rights reserved."></div><div><label for="bottom_en" class="block text-sm font-medium text-gray-700 mb-1">Copyright Text (EN)</label><input type="text" id="bottom_en" name="bottom_en" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="QurbanBerkah. All rights reserved."></div></div><p class="text-sm text-gray-500">Teks ini akan muncul setelah tahun di bagian bawah footer.</p><div class="pt-4"><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Simpan Perubahan</button></div></form></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/footer-old.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/footer-old.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/footer-old.astro";
var $$url = "/admin/content/footer-old";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/footer-old@_@astro
var page = () => footer_old_exports;
//#endregion
export { page };
