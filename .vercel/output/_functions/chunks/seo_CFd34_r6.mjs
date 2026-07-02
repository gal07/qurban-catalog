import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/seo.astro
var seo_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Seo,
	file: () => $$file,
	url: () => $$url
});
var $$Seo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "SEO & Social Media" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-4xl mx-auto"><div class="bg-white shadow-sm ring-1 ring-slate-900/5 rounded-xl p-6 sm:p-8"><div class="mb-8 border-b border-slate-100 pb-6"><h2 class="text-xl font-bold text-slate-800">Pengaturan SEO & Social Media</h2><p class="text-slate-500 mt-1">Atur metadata untuk mesin pencari dan tampilan saat dibagikan ke WhatsApp, Facebook, dan Twitter.</p></div><form id="seo-form" class="space-y-8"><!-- Basic SEO --><div class="space-y-4"><h3 class="text-lg font-medium text-slate-900">Metadata Dasar</h3><div><label for="title" class="block text-sm font-medium text-slate-700 mb-1">Judul Halaman (Title)</label><input type="text" id="title" placeholder="Qurban Berkah - Katalog Hewan Qurban Terpercaya" class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm px-4 py-3 border"><p class="mt-1 text-xs text-slate-500">Judul yang muncul di tab browser dan hasil pencarian Google.</p></div><div><label for="description" class="block text-sm font-medium text-slate-700 mb-1">Deskripsi (Meta Description)</label><textarea id="description" rows="3" placeholder="Pusat penjualan hewan qurban terpercaya di Jakarta..." class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm px-4 py-3 border"></textarea><p class="mt-1 text-xs text-slate-500">Ringkasan singkat yang muncul di bawah judul pada hasil pencarian.</p></div><div><label for="keywords" class="block text-sm font-medium text-slate-700 mb-1">Kata Kunci (Keywords)</label><input type="text" id="keywords" placeholder="qurban, sapi, kambing, idul adha, jakarta" class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm px-4 py-3 border"><p class="mt-1 text-xs text-slate-500">Pisahkan dengan koma.</p></div></div><!-- Social Media Image --><div class="space-y-4 pt-6 border-t border-slate-100"><h3 class="text-lg font-medium text-slate-900">Tampilan Social Media (OG Image)</h3><p class="text-sm text-slate-500">Gambar ini akan muncul saat link dibagikan di WhatsApp, FB, dll. Disarankan ukuran 1200x630px.</p><div class="flex items-start gap-6"><div class="flex-shrink-0"><div id="image-preview-container" class="w-64 h-36 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group"><img id="image-preview" src="" alt="Social Preview" class="w-full h-full object-cover hidden"><span class="text-slate-400 text-sm group-hover:text-slate-500">No Image</span></div></div><div class="flex-1 space-y-3"><input type="file" id="ogFile" accept="image/*" class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-sky-50 file:text-sky-700
                        hover:file:bg-sky-100"><input type="hidden" id="ogImage"><p class="text-xs text-slate-500">Max 2MB. JPG, PNG.</p></div></div></div><!-- Submit --><div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3"><div id="status-message" class="text-sm font-medium hidden"></div><button type="submit" id="save-btn" class="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">Simpan Perubahan</button></div></form></div></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/seo.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/seo.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/seo.astro";
var $$url = "/admin/seo";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/seo@_@astro
var page = () => seo_exports;
//#endregion
export { page };
