import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as $$AdminLayout } from "./AdminLayout_DAeF_bvm.mjs";
import { i as $$PageHeader, n as $$SaveButton, r as $$FormCard, t as $$ActionBar } from "./ActionBar_9r5dBJIJ.mjs";
import { t as $$LocalizedInput } from "./LocalizedInput_DhS279JU.mjs";
//#region src/pages/admin/content/contact-v2.astro
var contact_v2_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ContactV2,
	file: () => $$file,
	url: () => $$url
});
var $$ContactV2 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Hubungi Kami (v2 - New Architecture)" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PageHeader", $$PageHeader, {
		"title": "Hubungi Kami",
		"description": "Kelola informasi kontak website",
		"icon": "📞"
	})}${maybeRenderHead($$result)}<form id="contact-form-v2">${renderComponent($$result, "FormCard", $$FormCard, {
		"title": "Informasi Kontak",
		"description": "Update alamat, telepon, dan email"
	}, { "default": ($$result) => renderTemplate`<div class="space-y-4">${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "address",
		"labelId": "Alamat (ID)",
		"labelEn": "Address (EN)",
		"type": "textarea",
		"placeholderId": "Masukkan alamat lengkap...",
		"placeholderEn": "Enter full address...",
		"required": true,
		"rows": 3
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "phone",
		"labelId": "Telepon (ID)",
		"labelEn": "Phone (EN)",
		"type": "tel",
		"placeholderId": "+62 xxx xxxx xxxx",
		"placeholderEn": "+62 xxx xxxx xxxx",
		"required": true
	})}${renderComponent($$result, "LocalizedInput", $$LocalizedInput, {
		"name": "email",
		"labelId": "Email (ID)",
		"labelEn": "Email (EN)",
		"type": "email",
		"placeholderId": "email@example.com",
		"placeholderEn": "email@example.com",
		"required": true
	})}</div>` })}${renderComponent($$result, "ActionBar", $$ActionBar, {
		"align": "right",
		"class": "mt-6"
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "SaveButton", $$SaveButton, {})}` })}</form>` })}${renderScript($$result, "/tmp/qc-fix/src/pages/admin/content/contact-v2.astro?astro&type=script&index=0&lang.ts")}<!--
COMPARISON:

OLD (contact.astro):
- 167 lines total
- ~80 lines of inline script
- Manual DOM manipulation
- Manual Firestore calls
- Manual error handling
- Manual loading states
- Duplicated across 6 files

NEW (contact-v2.astro):
- 60 lines total (64% reduction)
- ~10 lines of script
- Reusable components
- Centralized logic
- Automatic validation
- Automatic error handling
- Automatic loading states
- Type-safe
- Consistent UX

BENEFITS:
✅ Less code to maintain
✅ Consistent behavior
✅ Easier to test
✅ Better type safety
✅ Automatic validation
✅ Reusable across all content pages
✅ Single source of truth for logic
-->`;
}, "/tmp/qc-fix/src/pages/admin/content/contact-v2.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/admin/content/contact-v2.astro";
var $$url = "/admin/content/contact-v2";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/content/contact-v2@_@astro
var page = () => contact_v2_exports;
//#endregion
export { page };
