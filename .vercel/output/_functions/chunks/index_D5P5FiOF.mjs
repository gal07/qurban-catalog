import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createAstro, _ as addAttribute, a as renderComponent, d as renderTemplate, h as maybeRenderHead, n as renderScript, w as createComponent, x as unescapeHTML } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
import { t as db } from "./firebase_B8D-iNtT.mjs";
import { t as $$Layout } from "./Layout_BFOVOi4N.mjs";
import { doc, getDoc } from "firebase/firestore";
//#region src/components/Navbar.astro
var $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
	let logoUrl = "/logo.jpg";
	try {
		const logoSnap = await getDoc(doc(db, "content", "logo"));
		if (logoSnap.exists()) logoUrl = logoSnap.data().url || "/logo.jpg";
	} catch (e) {
		console.error("Error fetching logo:", e);
	}
	return renderTemplate`${maybeRenderHead($$result)}<nav class="navbar" id="navbar" data-astro-cid-l7arcky5><div class="container navbar-container" data-astro-cid-l7arcky5><a href="/" class="logo" data-astro-cid-l7arcky5><img${addAttribute(logoUrl, "src")} alt="Qurban Berkah Logo" class="h-12 w-auto mix-blend-multiply" data-astro-cid-l7arcky5></a><div class="nav-menu" id="nav-menu" data-astro-cid-l7arcky5><ul class="nav-links" data-astro-cid-l7arcky5><li data-astro-cid-l7arcky5><a href="/" class="nav-link" data-astro-cid-l7arcky5>Beranda</a></li><li data-astro-cid-l7arcky5><a href="/#catalog" id="catalog-link" class="nav-link" data-astro-cid-l7arcky5>Katalog</a></li><li data-astro-cid-l7arcky5><a href="#sedekah-daging" id="sedekah-daging-link" class="nav-link" data-astro-cid-l7arcky5>Sedekah Daging</a></li><li data-astro-cid-l7arcky5><a href="#how-to-buy" id="how-to-buy-link" class="nav-link" data-astro-cid-l7arcky5>Cara Pemesanan</a></li></ul></div><div class="nav-actions" data-astro-cid-l7arcky5><!-- Custom Language Switcher --><div class="lang-switch" data-astro-cid-l7arcky5><button class="lang-btn active" data-lang="id" data-astro-cid-l7arcky5>ID</button><span class="divider" data-astro-cid-l7arcky5>|</span><button class="lang-btn" data-lang="en" data-astro-cid-l7arcky5>EN</button></div><button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle Menu" data-astro-cid-l7arcky5><span class="bar" data-astro-cid-l7arcky5></span><span class="bar" data-astro-cid-l7arcky5></span><span class="bar" data-astro-cid-l7arcky5></span></button></div></div></nav>${renderScript($$result, "/tmp/qc-fix/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/Navbar.astro", void 0);
//#endregion
//#region src/utils/i18n.ts
/**
* Get localized content from a data object.
* Logic:
* 1. If lang is 'en', try `key_en`, then `key_id`, then `key`.
* 2. If lang is 'id', try `key_id`, then `key`.
* @param data The object containing data (e.g., Firestore doc data)
* @param key The base key (e.g., 'title')
* @param lang The language code ('id' or 'en')
*/
var getLocalizedContent = (data, key, lang) => {
	if (lang === "en") return data[`${key}_en`] || data[`${key}_id`] || data[key] || "";
	return data[`${key}_id`] || data[key] || "";
};
//#endregion
//#region src/components/Hero.astro
createAstro("https://astro.build");
var $$Hero = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Hero;
	const lang = Astro.cookies.get("app_lang")?.value || "id";
	let heroData = {
		badge: "Edisi Idul Adha 2026",
		title: "Qurban Sempurna untuk",
		titleHighlight: "Ibadah Terbaik",
		description: "Kami menyediakan hewan qurban (Sapi & Kambing) berkualitas premium, sehat, dan sesuai syariat. Amanah dan terpercaya untuk menyempurnakan ibadah Anda.",
		features: [
			"Sesuai Syariat",
			"Sehat & Gemuk",
			"Gratis Ongkir*"
		]
	};
	try {
		const docSnap = await getDoc(doc(db, "content", "hero"));
		if (docSnap.exists()) {
			const data = docSnap.data();
			const getVal = (key) => getLocalizedContent(data, key, lang);
			heroData.badge = getVal("badge") || heroData.badge;
			heroData.title = getVal("title") || heroData.title;
			heroData.titleHighlight = getVal("titleHighlight") || heroData.titleHighlight;
			heroData.description = getVal("description") || heroData.description;
			const rawFeatures = data.features || [];
			if (Array.isArray(rawFeatures) && rawFeatures.length > 0) if (typeof rawFeatures[0] === "string") heroData.features = rawFeatures;
			else heroData.features = rawFeatures.map((f) => f[lang] || f.id || "");
		}
	} catch (error) {
		console.error("Error fetching hero data:", error);
	}
	return renderTemplate`${maybeRenderHead($$result)}<section class="hero" data-astro-cid-ge2uvauf><div class="hero-bg" data-astro-cid-ge2uvauf></div><div class="hero-overlay" data-astro-cid-ge2uvauf></div><div class="container hero-container" data-astro-cid-ge2uvauf><div class="hero-content" data-astro-cid-ge2uvauf><span class="hero-badge" data-astro-cid-ge2uvauf>${heroData.badge}</span><h1 data-astro-cid-ge2uvauf>${heroData.title}<br data-astro-cid-ge2uvauf><span class="highlight" data-astro-cid-ge2uvauf>${heroData.titleHighlight}</span></h1><p data-astro-cid-ge2uvauf>${heroData.description}</p><div class="hero-actions" data-astro-cid-ge2uvauf><a href="#catalog" id="hero-catalog-btn" class="btn btn-primary" data-astro-cid-ge2uvauf>Lihat Katalog</a><a href="#how-to-buy" id="hero-how-to-buy-btn" class="btn btn-secondary-white" data-astro-cid-ge2uvauf>Cara Pemesanan</a></div><div class="hero-trust" data-astro-cid-ge2uvauf>${heroData.features.map((feature) => renderTemplate`<div class="trust-item" data-astro-cid-ge2uvauf><span class="trust-icon" data-astro-cid-ge2uvauf>✓</span><span data-astro-cid-ge2uvauf>${feature}</span></div>`)}</div></div></div></section>${renderScript($$result, "/tmp/qc-fix/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/Catalog.astro
createAstro("https://astro.build");
var $$Catalog = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Catalog;
	const lang = Astro.cookies.get("app_lang")?.value || "id";
	let catalogTitle = "Katalog Hewan Qurban";
	let catalogSubtitle = "Pilih hewan qurban terbaik Anda. Harga sudah termasuk biaya perawatan dan pengantaran (area terjangkau).";
	if (lang === "en") {
		catalogTitle = "Qurban Animals Catalog";
		catalogSubtitle = "Choose your best qurban animal. Price includes maintenance and delivery (affordable areas).";
	}
	try {
		const heroSnap = await getDoc(doc(db, "content", "hero"));
		if (heroSnap.exists()) {
			const data = heroSnap.data();
			const getVal = (key) => {
				if (lang === "en") return data[`${key}_en`] || data[`${key}_id`] || data[key];
				return data[`${key}_id`] || data[key];
			};
			catalogTitle = getVal("catalogTitle") || catalogTitle;
			catalogSubtitle = getVal("catalogSubtitle") || catalogSubtitle;
		}
	} catch (error) {
		console.error("Error fetching catalog content:", error);
	}
	return renderTemplate`${maybeRenderHead($$result)}<section id="catalog" class="catalog" data-astro-cid-4ep3xrrv><div class="container" data-astro-cid-4ep3xrrv><div class="section-header" data-astro-cid-4ep3xrrv><h2 class="section-title" data-astro-cid-4ep3xrrv>${catalogTitle}</h2><p class="section-subtitle" data-astro-cid-4ep3xrrv>${catalogSubtitle}</p></div><!-- Loading State --><div id="loading" class="loading" data-astro-cid-4ep3xrrv><div class="spinner" data-astro-cid-4ep3xrrv></div><p data-astro-cid-4ep3xrrv>Memuat katalog...</p></div><!-- Grid Container --><div class="slider-wrapper" data-astro-cid-4ep3xrrv><button id="slider-prev" class="slider-btn prev hidden" aria-label="Previous" data-astro-cid-4ep3xrrv><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4ep3xrrv><polyline points="15 18 9 12 15 6" data-astro-cid-4ep3xrrv></polyline></svg></button><div id="animal-grid" class="animal-grid" data-astro-cid-4ep3xrrv><!-- Animals will be injected here by JS --></div><button id="slider-next" class="slider-btn next hidden" aria-label="Next" data-astro-cid-4ep3xrrv><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4ep3xrrv><polyline points="9 18 15 12 9 6" data-astro-cid-4ep3xrrv></polyline></svg></button></div><!-- Load More --><div id="load-more-container" class="load-more-container hidden" data-astro-cid-4ep3xrrv><button id="btn-load-more" class="btn-load-more" data-astro-cid-4ep3xrrv>Muat Lebih Banyak</button></div><!-- Empty State --><div id="empty-state" class="empty-state hidden" data-astro-cid-4ep3xrrv><div class="empty-icon" data-astro-cid-4ep3xrrv>🐂</div><h3 data-astro-cid-4ep3xrrv>Stok Belum Tersedia</h3><p data-astro-cid-4ep3xrrv>Mohon maaf, saat ini belum ada hewan qurban yang tersedia. Silakan hubungi kami untuk informasi lebih lanjut.</p></div></div></section><!-- Product Detail Modal --><div id="product-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true" data-astro-cid-4ep3xrrv><div class="modal-container" data-astro-cid-4ep3xrrv><button id="modal-close" class="modal-close-btn" aria-label="Close modal" data-astro-cid-4ep3xrrv><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-4ep3xrrv><line x1="18" y1="6" x2="6" y2="18" data-astro-cid-4ep3xrrv></line><line x1="6" y1="6" x2="18" y2="18" data-astro-cid-4ep3xrrv></line></svg></button><div class="modal-content" data-astro-cid-4ep3xrrv><!-- Image Side --><div class="modal-image-wrapper" data-astro-cid-4ep3xrrv><img id="modal-img" src="" alt="" class="modal-img" data-astro-cid-4ep3xrrv><div id="modal-sold-overlay" class="sold-overlay hidden" data-astro-cid-4ep3xrrv><span data-astro-cid-4ep3xrrv>TERJUAL</span></div></div><!-- Details Side --><div class="modal-details" data-astro-cid-4ep3xrrv><div class="modal-header" data-astro-cid-4ep3xrrv><h3 id="modal-title" class="modal-title" data-astro-cid-4ep3xrrv></h3><div class="modal-price-wrapper" data-astro-cid-4ep3xrrv><span class="modal-price-label" data-astro-cid-4ep3xrrv>Harga Spesial</span><span id="modal-price" class="modal-price" data-astro-cid-4ep3xrrv></span></div></div><div class="modal-body" data-astro-cid-4ep3xrrv><p id="modal-desc" class="modal-desc" data-astro-cid-4ep3xrrv></p><div class="modal-meta" data-astro-cid-4ep3xrrv><div class="meta-item" data-astro-cid-4ep3xrrv><span class="meta-icon" data-astro-cid-4ep3xrrv>⚖️</span><span class="meta-label" data-astro-cid-4ep3xrrv>Berat:</span><span id="modal-weight-text" class="meta-value" data-astro-cid-4ep3xrrv></span></div><div class="meta-item" data-astro-cid-4ep3xrrv><span class="meta-icon" data-astro-cid-4ep3xrrv>🏷️</span><span class="meta-label" data-astro-cid-4ep3xrrv>Jenis:</span><span id="modal-type-text" class="meta-value" data-astro-cid-4ep3xrrv></span></div></div></div><div class="modal-footer" id="modal-footer" data-astro-cid-4ep3xrrv><a id="modal-campaign-btn" href="#" target="_blank" class="btn btn-campaign hidden" data-astro-cid-4ep3xrrv>Beli Sekarang</a><a id="modal-wa-btn" href="#" target="_blank" class="btn btn-whatsapp full-width" data-astro-cid-4ep3xrrv><i class="fab fa-whatsapp btn-icon-fa" data-astro-cid-4ep3xrrv></i><span data-astro-cid-4ep3xrrv>Pesan via WhatsApp</span></a></div></div></div></div></div>${renderScript($$result, "/tmp/qc-fix/src/components/Catalog.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/Catalog.astro", void 0);
//#endregion
//#region src/components/SedekahDaging.astro
createAstro("https://astro.build");
var $$SedekahDaging = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SedekahDaging;
	let content = {
		badge: "Program Spesial",
		title: "Sedekah Daging",
		titleHighlight: "Sebar Bahagia",
		description: "Salurkan kebahagiaan Idul Adha kepada mereka yang membutuhkan. Program Sedekah Daging memberimakna.id menyalurkan amanah Anda tepat sasaran hingga pelosok negeri.",
		buttonText: "Ikut Sedekah Daging",
		buttonUrl: "https://memberimakna.id",
		imageUrl: "/sedekah-daging.png",
		trustIndicators: ["Tepat Sasaran", "Laporan Transparan"]
	};
	try {
		const docSnap = await getDoc(doc(db, "content", "sedekah_daging"));
		const lang = Astro.cookies.get("app_lang")?.value || "id";
		if (docSnap.exists()) {
			const data = docSnap.data();
			const getVal = (key) => {
				if (lang === "en") return data[`${key}_en`] || data[key];
				return data[key];
			};
			content.badge = getVal("badge") || content.badge;
			content.title = getVal("title") || content.title;
			content.titleHighlight = getVal("titleHighlight") || content.titleHighlight;
			content.description = getVal("description") || content.description;
			content.buttonText = getVal("buttonText") || content.buttonText;
			content.buttonUrl = data.buttonUrl || content.buttonUrl;
			content.imageUrl = data.imageUrl || content.imageUrl;
			const rawIndicators = data.trustIndicators || [];
			if (rawIndicators.length > 0) content.trustIndicators = rawIndicators.map((ind) => {
				if (typeof ind === "string") return ind;
				return lang === "en" ? ind.en || ind.id : ind.id;
			}).filter((s) => s && s.trim() !== "");
		}
	} catch (error) {
		console.error("Error fetching sedekah daging data:", error);
	}
	return renderTemplate`${maybeRenderHead($$result)}<section id="sedekah-daging" class="sedekah-section" data-astro-cid-7clfjymp><div class="container" data-astro-cid-7clfjymp><div class="content-wrapper" data-astro-cid-7clfjymp><div class="text-content" data-astro-cid-7clfjymp><span class="badge" data-astro-cid-7clfjymp>${content.badge}</span><h2 class="title" data-astro-cid-7clfjymp>${content.title}<br data-astro-cid-7clfjymp><span class="highlight" data-astro-cid-7clfjymp>${content.titleHighlight}</span></h2><p class="description" data-astro-cid-7clfjymp>${content.description}</p><div class="actions" data-astro-cid-7clfjymp><a${addAttribute(content.buttonUrl, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-cta" data-astro-cid-7clfjymp>${content.buttonText}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow" data-astro-cid-7clfjymp><line x1="5" y1="12" x2="19" y2="12" data-astro-cid-7clfjymp></line><polyline points="12 5 19 12 12 19" data-astro-cid-7clfjymp></polyline></svg></a></div><div class="trust-indicators" data-astro-cid-7clfjymp>${content.trustIndicators.map((item) => renderTemplate`<div class="trust-item" data-astro-cid-7clfjymp><span class="check-icon" data-astro-cid-7clfjymp>✓</span> ${item}</div>`)}</div></div><div class="image-content" data-astro-cid-7clfjymp><div class="image-wrapper" data-astro-cid-7clfjymp><img${addAttribute(content.imageUrl, "src")}${addAttribute(content.title, "alt")} class="hero-image" loading="lazy" data-astro-cid-7clfjymp><!-- Decorative elements --><div class="blob blob-1" data-astro-cid-7clfjymp></div><div class="blob blob-2" data-astro-cid-7clfjymp></div></div></div></div></div></section>`;
}, "/tmp/qc-fix/src/components/SedekahDaging.astro", void 0);
//#endregion
//#region src/components/HowToBuy.astro
createAstro("https://astro.build");
var $$HowToBuy = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HowToBuy;
	let howToData = {
		subtitle: "Proses mudah dan transparan untuk kenyamanan ibadah Anda",
		steps: [
			{
				title: "Pilih Hewan",
				description: "Cari hewan qurban yang sesuai dengan syariat dan budget Anda di katalog kami."
			},
			{
				title: "Hubungi via WA",
				description: "Klik tombol pesan untuk terhubung langsung dengan admin kami untuk konfirmasi stok."
			},
			{
				title: "Pembayaran",
				description: "Lakukan pembayaran (Transfer/Cash) sesuai kesepakatan. Kwitansi resmi akan dikirimkan."
			},
			{
				title: "Pengantaran",
				description: "Hewan akan diantar ke lokasi Anda H-1 Idul Adha atau disalurkan ke penerima manfaat."
			}
		]
	};
	try {
		const docSnap = await getDoc(doc(db, "content", "how_to"));
		const lang = Astro.cookies.get("app_lang")?.value || "id";
		if (docSnap.exists()) {
			const data = docSnap.data();
			if (lang === "en") howToData.subtitle = data.subtitle_en || data.subtitle || howToData.subtitle;
			else howToData.subtitle = data.subtitle || howToData.subtitle;
			const rawSteps = data.steps || [];
			if (rawSteps.length > 0) howToData.steps = rawSteps.map((step) => ({
				title: lang === "en" ? step.title_en || step.title : step.title,
				description: lang === "en" ? step.description_en || step.description : step.description
			}));
		}
	} catch (error) {
		console.error("Error fetching how-to data:", error);
	}
	return renderTemplate`${maybeRenderHead($$result)}<section id="how-to-buy" class="how-to-buy" data-astro-cid-oudpq74k><div class="container" data-astro-cid-oudpq74k><div class="section-header" data-astro-cid-oudpq74k><h2 class="section-title" data-astro-cid-oudpq74k>Cara Pemesanan</h2><p class="section-subtitle" data-astro-cid-oudpq74k>${howToData.subtitle}</p></div><div class="steps-wrapper" data-astro-cid-oudpq74k><div class="steps-connector" data-astro-cid-oudpq74k></div>${howToData.steps.map((step, index) => renderTemplate`<div class="step-item" data-astro-cid-oudpq74k><div class="step-icon-wrapper" data-astro-cid-oudpq74k><div class="step-icon" data-astro-cid-oudpq74k>${index + 1}</div></div><div class="step-content" data-astro-cid-oudpq74k><h3 data-astro-cid-oudpq74k>${step.title}</h3><p data-astro-cid-oudpq74k>${step.description}</p></div></div>`)}</div></div></section>`;
}, "/tmp/qc-fix/src/components/HowToBuy.astro", void 0);
//#endregion
//#region src/components/Footer.astro
createAstro("https://astro.build");
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Footer;
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	let footerData = {
		address: "Perlu diisi",
		phone: "Perlu diisi",
		email: "Perlu diisi",
		description: "Mitra ibadah qurban terpercaya. Menyediakan hewan sehat, berkualitas, dan sesuai syariat untuk menyempurnakan ibadah Anda.",
		bottom: "QurbanBerkah. All rights reserved.",
		socialLinks: []
	};
	let logoUrl = "/logo.jpg";
	try {
		const [contactSnap, footerSnap, socialSnap, logoSnap] = await Promise.all([
			getDoc(doc(db, "content", "hubungi_kami")),
			getDoc(doc(db, "content", "footer")),
			getDoc(doc(db, "content", "social")),
			getDoc(doc(db, "content", "logo"))
		]);
		const lang = Astro.cookies.get("app_lang")?.value || "id";
		if (contactSnap.exists()) {
			const data = contactSnap.data();
			footerData.address = (lang === "en" ? data.address_en : data.address) || footerData.address;
			footerData.phone = data.phone || footerData.phone;
			footerData.email = data.email || footerData.email;
		}
		if (footerSnap.exists()) {
			const data = footerSnap.data();
			footerData.description = (lang === "en" ? data.description_en : data.description) || footerData.description;
			footerData.bottom = (lang === "en" ? data.bottom_en : data.bottom) || footerData.bottom;
		}
		if (socialSnap.exists()) footerData.socialLinks = socialSnap.data().links || [];
		if (logoSnap.exists()) logoUrl = logoSnap.data().url || "/logo.jpg";
	} catch (error) {
		console.error("Error fetching footer data:", error);
	}
	const socialIcons = {
		Facebook: `<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>`,
		Instagram: `<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>`,
		Twitter: `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S7.2 12.1 6.5 11.3c-4.7-2.8-1.1-7.1-0.2-7.5 1.6-1.6 4.3.4 5 1.6 4.6-2.5 8.9-6.3 10.7-5.4z"></path>`,
		WhatsApp: `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>`,
		YouTube: `<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>`,
		TikTok: `<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>`,
		LinkedIn: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>`
	};
	return renderTemplate`${maybeRenderHead($$result)}<footer class="footer" data-astro-cid-jo6i4kqk><div class="container footer-container" data-astro-cid-jo6i4kqk><div class="footer-brand" data-astro-cid-jo6i4kqk><div class="footer-brand-logo mb-4" data-astro-cid-jo6i4kqk><img${addAttribute(logoUrl, "src")} alt="Qurban Berkah Logo" class="h-16 w-auto rounded-lg" loading="lazy" width="64" height="64" data-astro-cid-jo6i4kqk></div><p data-astro-cid-jo6i4kqk>${footerData.description}</p></div><div class="footer-contact" data-astro-cid-jo6i4kqk><h4 data-astro-cid-jo6i4kqk>Hubungi Kami</h4><ul class="contact-list" data-astro-cid-jo6i4kqk><li data-astro-cid-jo6i4kqk><span class="icon" data-astro-cid-jo6i4kqk>📍</span><span data-astro-cid-jo6i4kqk>${footerData.address}</span></li><li data-astro-cid-jo6i4kqk><span class="icon" data-astro-cid-jo6i4kqk>📞</span><span data-astro-cid-jo6i4kqk>${footerData.phone}</span></li><li data-astro-cid-jo6i4kqk><span class="icon" data-astro-cid-jo6i4kqk>📧</span><span data-astro-cid-jo6i4kqk>${footerData.email}</span></li></ul></div><div class="footer-social" data-astro-cid-jo6i4kqk><h4 data-astro-cid-jo6i4kqk>Ikuti Kami</h4><div class="social-links" data-astro-cid-jo6i4kqk>${footerData.socialLinks.length > 0 ? footerData.socialLinks.map((link) => renderTemplate`<a${addAttribute(link.url, "href")}${addAttribute(link.platform, "aria-label")} target="_blank" rel="noopener noreferrer" data-astro-cid-jo6i4kqk><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jo6i4kqk>${unescapeHTML(socialIcons[link.platform] || "")}</svg></a>`) : renderTemplate`<p class="text-sm text-gray-400" data-astro-cid-jo6i4kqk>No social media links configured</p>`}</div></div></div><div class="footer-bottom" data-astro-cid-jo6i4kqk><div class="container" data-astro-cid-jo6i4kqk><div class="copyright" data-astro-cid-jo6i4kqk>&copy; ${currentYear}${footerData.bottom}</div></div></div></footer>`;
}, "/tmp/qc-fix/src/components/Footer.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let seoData = {};
	try {
		const seoSnap = await getDoc(doc(db, "seo", "landing"));
		if (seoSnap.exists()) seoData = seoSnap.data();
	} catch (e) {
		console.error("Failed to fetch SEO:", e);
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": seoData.title || "Qurban Berkah - Katalog Hewan Qurban Terpercaya",
		"seo": seoData
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Navbar", $$Navbar, {})}${maybeRenderHead($$result)}<main>${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "Catalog", $$Catalog, {})}${renderComponent($$result, "SedekahDaging", $$SedekahDaging, {})}${renderComponent($$result, "HowToBuy", $$HowToBuy, {})}</main>${renderComponent($$result, "Footer", $$Footer, {})}<script>
		function loadTawkTo() {
			if (window.Tawk_API) return;
			window.Tawk_API = window.Tawk_API || {};
			window.Tawk_LoadStart = new Date();
			(function () {
				var s1 = document.createElement("script"),
					s0 = document.getElementsByTagName("script")[0];
				s1.async = true;
				s1.src =
					"https://embed.tawk.to/697c62ef0f84561c3546f8fb/1jg6u4ugs";
				s1.charset = "UTF-8";
				s1.setAttribute("crossorigin", "*");
				s0.parentNode.insertBefore(s1, s0);
			})();
		}

		function initLazyLoad() {
			let loaded = false;
			const trigger = () => {
				if (loaded) return;
				loaded = true;
				loadTawkTo();
			};

			const events = ["mousemove", "scroll", "touchstart", "keydown"];
			events.forEach((e) =>
				window.addEventListener(e, trigger, {
					once: true,
					passive: true,
				}),
			);

			// Fallback if no interaction
			setTimeout(trigger, 4000);
		}

		if (document.readyState === "complete") {
			initLazyLoad();
		} else {
			window.addEventListener("load", initLazyLoad);
		}
	<\/script>` })}`;
}, "/tmp/qc-fix/src/pages/index.astro", void 0);
var $$file = "/tmp/qc-fix/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
