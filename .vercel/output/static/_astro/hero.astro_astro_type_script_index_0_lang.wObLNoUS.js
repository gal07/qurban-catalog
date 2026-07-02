import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";import{n as a}from"./sanitize.UeGmBb_z.js";import{n as o,t as s}from"./UnsavedChanges.Dvd-coVg.js";document.addEventListener(`astro:page-load`,async()=>{let c=document.getElementById(`hero-form`);if(!c)return;let l=new o(`hero-form`,c),u=new s(c);l.start(),u.start();let d=document.querySelector(`#features-list-container .list-items`),f=document.querySelector(`#features-list-container .add-item-btn`),p=document.querySelector(`#features-list-container .empty-state`);if(!d||!f||!p)return;let m=[];function h(){m.length===0?(d.innerHTML=``,p.classList.remove(`hidden`)):(p.classList.add(`hidden`),d.innerHTML=m.map((e,t)=>`
                            <div class="list-item" data-index="${t}">
                                <div class="list-item-content">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-slate-700 mb-1">
                                                Fitur ${t+1} (ID)
                                            </label>
                                            <input
                                                type="text"
                                                name="feature_${t}"
                                                value="${a(e.text||``)}"
                                                placeholder="Masukkan fitur..."
                                                class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                            />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-slate-700 mb-1">
                                                Feature ${t+1} (EN)
                                            </label>
                                            <input
                                                type="text"
                                                name="feature_${t}_en"
                                                value="${a(e.text_en||``)}"
                                                placeholder="Enter feature..."
                                                class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    type="button"
                                    class="remove-item-btn"
                                    data-index="${t}"
                                    title="Remove feature"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join(``),d.querySelectorAll(`.remove-item-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.dataset.index||`0`);m.splice(t,1),h()})}))}f.addEventListener(`click`,()=>{m.push({text:``,text_en:``}),h()});try{let r=await t(e(n,`content`,`hero`));if(r.exists()){let e=r.data(),t=c.querySelector(`[name="badge"]`),n=c.querySelector(`[name="badge_en"]`),i=c.querySelector(`[name="title"]`),a=c.querySelector(`[name="title_en"]`),o=c.querySelector(`[name="titleHighlight"]`),s=c.querySelector(`[name="titleHighlight_en"]`),l=c.querySelector(`[name="description"]`),u=c.querySelector(`[name="description_en"]`);t&&(t.value=e.badge||``),n&&(n.value=e.badge_en||``),i&&(i.value=e.title||``),a&&(a.value=e.title_en||``),o&&(o.value=e.titleHighlight||``),s&&(s.value=e.titleHighlight_en||``),l&&(l.value=e.description||``),u&&(u.value=e.description_en||``);let d=c.querySelector(`[name="catalogTitle"]`),f=c.querySelector(`[name="catalogTitle_en"]`),p=c.querySelector(`[name="catalogSubtitle"]`),g=c.querySelector(`[name="catalogSubtitle_en"]`);d&&(d.value=e.catalogTitle||``),f&&(f.value=e.catalogTitle_en||``),p&&(p.value=e.catalogSubtitle||``),g&&(g.value=e.catalogSubtitle_en||``),m=e.features||[],h()}}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}c.addEventListener(`submit`,async t=>{t.preventDefault();let a=c.querySelector(`button[type="submit"]`);a&&(a.textContent=`Menyimpan...`,a.disabled=!0);try{let t=c.querySelector(`[name="badge"]`),a=c.querySelector(`[name="badge_en"]`),o=c.querySelector(`[name="title"]`),s=c.querySelector(`[name="title_en"]`),d=c.querySelector(`[name="titleHighlight"]`),f=c.querySelector(`[name="titleHighlight_en"]`),p=c.querySelector(`[name="description"]`),h=c.querySelector(`[name="description_en"]`),g=c.querySelector(`[name="catalogTitle"]`),_=c.querySelector(`[name="catalogTitle_en"]`),v=c.querySelector(`[name="catalogSubtitle"]`),y=c.querySelector(`[name="catalogSubtitle_en"]`),b=m.map((e,t)=>{let n=c.querySelector(`[name="feature_${t}"]`),r=c.querySelector(`[name="feature_${t}_en"]`);return{text:n?.value||``,text_en:r?.value||``}}).filter(e=>e.text&&e.text_en),x={badge:t?.value||``,badge_en:a?.value||``,title:o?.value||``,title_en:s?.value||``,titleHighlight:d?.value||``,titleHighlight_en:f?.value||``,description:p?.value||``,description_en:h?.value||``,catalogTitle:g?.value||``,catalogTitle_en:_?.value||``,catalogSubtitle:v?.value||``,catalogSubtitle_en:y?.value||``,features:b,updatedAt:new Date().toISOString()};await r(e(n,`content`,`hero`),x),l.clearDraft(),u.markAsSaved(),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{a&&(a.textContent=`Simpan Perubahan`,a.disabled=!1)}}),document.addEventListener(`astro:before-swap`,()=>{l.stop(),u.stop()})});