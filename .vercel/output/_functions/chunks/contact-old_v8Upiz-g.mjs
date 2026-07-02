import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
//#region src/pages/admin/content/contact-old.astro
var contact_old_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ContactOld,
	file: () => $$file,
	url: () => $$url
});
var $$ContactOld = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Hubungi Kami" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6"><h1 class="text-2xl font-bold text-gray-800 mb-4">Manage Hubungi Kami</h1><p class="text-gray-600 mb-6">Edit contact information (Hubungi Kami) displayed in the footer.</p><form id="contact-form" class="space-y-6 max-w-lg"><!-- Address --><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="address" class="block text-sm font-medium text-gray-700 mb-1">Alamat (ID)</label><textarea id="address" name="address" rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Jl. Masjid Al-Huda No. 123..."></textarea></div><div><label for="address_en" class="block text-sm font-medium text-gray-700 mb-1">Address (EN)</label><textarea id="address_en" name="address_en" rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="123 Al-Huda Mosque St..."></textarea></div></div><div><label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label><input type="text" id="phone" name="phone" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="+62 812-3456-7890"></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" id="email" name="email" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="info@qurbanberkah.com"></div><div class="pt-4"><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Simpan Perubahan</button></div></form></div>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/contact-old.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/pages/admin/content/contact-old.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/contact-old.astro";
var $$url = "/admin/content/contact-old";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/contact-old@_@astro
var page = () => contact_old_exports;
//#endregion
export { page };
