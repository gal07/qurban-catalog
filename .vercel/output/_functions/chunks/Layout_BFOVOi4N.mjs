import { C as createAstro, _ as addAttribute, a as renderComponent, c as renderSlot, d as renderTemplate, g as renderHead, n as renderScript, v as defineScriptVars, w as createComponent } from "./server_BeNfQ4JR.mjs";
import "./compiler_y-Drgp0Q.mjs";
/* empty css                 */
//#region src/components/ThemeLoader.astro
var $$ThemeLoader = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<script>
    // 1. Try to load from local storage immediately to prevent flash
    try {
        const cachedTheme = localStorage.getItem("app-theme");
        if (cachedTheme) {
            const theme = JSON.parse(cachedTheme);
            const root = document.documentElement;

            if (theme.primary)
                root.style.setProperty("--color-primary", theme.primary);
            if (theme.primaryLight)
                root.style.setProperty(
                    "--color-primary-light",
                    theme.primaryLight,
                );
            if (theme.primaryDark)
                root.style.setProperty(
                    "--color-primary-dark",
                    theme.primaryDark,
                );
            if (theme.accent)
                root.style.setProperty("--color-accent", theme.accent);
            if (theme.accentLight)
                root.style.setProperty(
                    "--color-accent-light",
                    theme.accentLight,
                );
        }
    } catch (e) {
        console.error("Error loading cached theme", e);
    }
<\/script>${renderScript($$result, "/tmp/qc-fix/src/components/ThemeLoader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/tmp/qc-fix/src/components/ThemeLoader.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, seo } = Astro.props;
	const description = seo?.description || "Katalog Hewan Qurban Terpercaya";
	const keywords = seo?.keywords || "qurban, sapi, kambing, idul adha";
	const image = seo?.ogImage || "/logo.jpg";
	const canonicalURL = new URL(Astro.url.pathname, Astro.site || Astro.url.origin);
	const shouldAutoTranslate = (Astro.request.headers.get("x-vercel-ip-country") || "ID") !== "ID";
	return renderTemplate`<html lang="id" class="scroll-smooth"><head><meta charset="UTF-8"><!-- transitions built-in via Astro 7 --><meta name="viewport" content="width=device-width"><!-- SEO --><meta name="description"${addAttribute(description, "content")}><meta name="keywords"${addAttribute(keywords, "content")}><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro.url, "content")}><meta property="og:title"${addAttribute(seo?.ogTitle || title, "content")}><meta property="og:description"${addAttribute(seo?.ogDescription || description, "content")}><meta property="og:image"${addAttribute(image, "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro.url, "content")}><meta property="twitter:title"${addAttribute(seo?.ogTitle || title, "content")}><meta property="twitter:description"${addAttribute(seo?.ogDescription || description, "content")}><meta property="twitter:image"${addAttribute(image, "content")}><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><!-- Google Fonts: Outfit & Playfair Display --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"><!-- Font Awesome --><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"><title>${title}</title>${renderComponent($$result, "ThemeLoader", $$ThemeLoader, {})}${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}<!-- Google Translate Script --><script>(function(){${defineScriptVars({ shouldAutoTranslate })}
			// Determine if we need to force English
			// Check if cookie already exists to avoid overwriting user preference
			const hasCookie = document.cookie
				.split(";")
				.some((item) => item.trim().startsWith("googtrans="));

			if (shouldAutoTranslate && !hasCookie) {
				// Set cookie to translate from Indonesian (auto/id) to English (en)
				// Domain should ideally be set to root, but generic path often works
				document.cookie = "googtrans=/id/en; path=/";
				document.cookie =
					"googtrans=/id/en; path=/; domain=" +
					window.location.hostname;
			}

			window.googleTranslateElementInit = function () {
				new google.translate.TranslateElement(
					{
						pageLanguage: "id",
						includedLanguages: "en,id",
						layout: google.translate.TranslateElement.InlineLayout
							.SIMPLE,
						autoDisplay: false,
					},
					"google_translate_element",
				);
			};

			// Defer loading of the heavy Google Script
			window.addEventListener("load", function () {
				const script = document.createElement("script");
				script.type = "text/javascript";
				script.src =
					"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
				document.body.appendChild(script);
			});
		})();<\/script></body></html>`;
}, "/tmp/qc-fix/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
