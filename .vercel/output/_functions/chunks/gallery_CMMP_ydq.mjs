import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/gallery.astro
var gallery_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gallery,
	file: () => $$file,
	url: () => $$url
});
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Media Gallery" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6"><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-gray-800">Media Gallery</h1><p class="text-gray-600">Upload and manage your images (Max 5MB).</p></div><button id="btn-upload-trigger" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Upload Image</button><input type="file" id="file-upload" class="hidden" accept="image/*"></div><!-- Upload Protocol Feedback --><div id="upload-status" class="hidden mb-6 p-4 rounded-md"></div><!-- Gallery Grid --><div id="gallery-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"><!-- Images injected here --></div><!-- Loading State --><div id="loading-skeleton" class="hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"><!-- Simple Skeletons -->${[
		1,
		2,
		3,
		4
	].map(() => renderTemplate`<div class="animate-pulse"><div class="bg-gray-200 h-48 rounded-lg mb-2"></div><div class="h-4 bg-gray-200 rounded w-3/4"></div></div>`)}</div><!-- Pagination / Load More --><div class="mt-8 text-center"><button id="btn-load-more" class="hidden px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition font-medium">Load More</button><p id="end-message" class="hidden text-gray-500 text-sm mt-4">All images loaded.</p></div></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/gallery.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/gallery.astro";
var $$url = "/admin/gallery";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/gallery@_@astro
var page = () => gallery_exports;
//#endregion
export { page };
