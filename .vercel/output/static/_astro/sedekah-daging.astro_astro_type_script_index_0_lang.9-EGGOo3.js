import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";import{n as a,t as o}from"./UnsavedChanges.Dvd-coVg.js";document.addEventListener(`astro:page-load`,async()=>{let s=document.getElementById(`sedekah-form`);if(!s)return;let c=new a(`sedekah-daging-form`,s),l=new o(s);c.start(),l.start();let u=document.querySelector(`#features-list-container .list-items`),d=document.querySelector(`#features-list-container .add-item-btn`),f=document.querySelector(`#features-list-container .empty-state`);if(!u||!d||!f)return;let p=[];function m(){p.length===0?(u.innerHTML=``,f.classList.remove(`hidden`)):(f.classList.add(`hidden`),u.innerHTML=p.map((e,t)=>`
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
                                                value="${e.text||``}"
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
                                                value="${e.text_en||``}"
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
                        `).join(``),u.querySelectorAll(`.remove-item-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.dataset.index||`0`);p.splice(t,1),m()})}))}d.addEventListener(`click`,()=>{p.push({text:``,text_en:``}),m()});try{let r=await t(e(n,`content`,`sedekah_daging`));if(r.exists()){let e=r.data(),t=s.querySelector(`[name="badge"]`),n=s.querySelector(`[name="badge_en"]`),i=s.querySelector(`[name="title"]`),a=s.querySelector(`[name="title_en"]`),o=s.querySelector(`[name="titleHighlight"]`),c=s.querySelector(`[name="titleHighlight_en"]`),l=s.querySelector(`[name="description"]`),u=s.querySelector(`[name="description_en"]`);t&&(t.value=e.badge||``),n&&(n.value=e.badge_en||``),i&&(i.value=e.title||``),a&&(a.value=e.title_en||``),o&&(o.value=e.titleHighlight||``),c&&(c.value=e.titleHighlight_en||``),l&&(l.value=e.description||``),u&&(u.value=e.description_en||``),p=e.features||[],m()}}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}s.addEventListener(`submit`,async t=>{t.preventDefault();let a=s.querySelector(`button[type="submit"]`);a&&(a.textContent=`Menyimpan...`,a.disabled=!0);try{let t=s.querySelector(`[name="badge"]`),a=s.querySelector(`[name="badge_en"]`),o=s.querySelector(`[name="title"]`),u=s.querySelector(`[name="title_en"]`),d=s.querySelector(`[name="titleHighlight"]`),f=s.querySelector(`[name="titleHighlight_en"]`),m=s.querySelector(`[name="description"]`),h=s.querySelector(`[name="description_en"]`),g=p.map((e,t)=>{let n=s.querySelector(`[name="feature_${t}"]`),r=s.querySelector(`[name="feature_${t}_en"]`);return{text:n?.value||``,text_en:r?.value||``}}).filter(e=>e.text&&e.text_en),_={badge:t?.value||``,badge_en:a?.value||``,title:o?.value||``,title_en:u?.value||``,titleHighlight:d?.value||``,titleHighlight_en:f?.value||``,description:m?.value||``,description_en:h?.value||``,features:g,updatedAt:new Date().toISOString()};await r(e(n,`content`,`sedekah_daging`),_),c.clearDraft(),l.markAsSaved(),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{a&&(a.textContent=`Simpan Perubahan`,a.disabled=!1)}}),document.addEventListener(`astro:before-swap`,()=>{c.stop(),l.stop()})});