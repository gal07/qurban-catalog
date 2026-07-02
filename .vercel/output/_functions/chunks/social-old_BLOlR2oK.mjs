import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/content/social-old.astro
var social_old_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SocialOld,
	file: () => $$file,
	url: () => $$url
});
var $$SocialOld = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Ikuti Kami" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-800 mb-4">Manage Social Media</h1><p class="text-gray-600 mb-6">Add and manage social media links displayed in the footer.</p><div id="social-links-container" class="space-y-4 mb-6"></div><button type="button" id="add-link-btn" class="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">+ Add Social Media</button><div class="pt-4 border-t"><button type="button" id="save-btn" class="w-full max-w-lg flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Simpan Perubahan</button></div></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/social-old.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/social-old.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/social-old.astro";
var $$url = "/admin/content/social-old";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/social-old@_@astro
var page = () => social_old_exports;
//#endregion
export { page };
