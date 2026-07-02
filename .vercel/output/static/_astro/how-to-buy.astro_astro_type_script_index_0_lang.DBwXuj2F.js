import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";import{n as a}from"./sanitize.UeGmBb_z.js";import{n as o,t as s}from"./UnsavedChanges.Dvd-coVg.js";document.addEventListener(`astro:page-load`,async()=>{let c=document.getElementById(`how-to-buy-form`);if(!c)return;let l=new o(`how-to-buy-form`,c),u=new s(c);l.start(),u.start();let d=document.querySelector(`#steps-list-container .list-items`),f=document.querySelector(`#steps-list-container .add-item-btn`),p=document.querySelector(`#steps-list-container .empty-state`);if(!d||!f||!p)return;let m=[];function h(){m.length===0?(d.innerHTML=``,p.classList.remove(`hidden`)):(p.classList.add(`hidden`),d.innerHTML=m.map((e,t)=>`
                            <div class="list-item" data-index="${t}">
                                <div class="list-item-content">
                                    <div class="space-y-4">
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm font-medium text-slate-700 mb-1">
                                                    Langkah ${t+1} - Judul (ID)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="step_title_${t}"
                                                    value="${a(e.title||``)}"
                                                    placeholder="Pilih Hewan Qurban"
                                                    class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                                />
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-slate-700 mb-1">
                                                    Step ${t+1} - Title (EN)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="step_title_${t}_en"
                                                    value="${e.title_en||``}"
                                                    placeholder="Choose Qurban Animal"
                                                    class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                                />
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm font-medium text-slate-700 mb-1">
                                                    Deskripsi (ID)
                                                </label>
                                                <textarea
                                                    name="step_description_${t}"
                                                    rows="3"
                                                    placeholder="Pilih hewan qurban sesuai kebutuhan..."
                                                    class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                                >${a(e.description||``)}</textarea>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-slate-700 mb-1">
                                                    Description (EN)
                                                </label>
                                                <textarea
                                                    name="step_description_${t}_en"
                                                    rows="3"
                                                    placeholder="Choose the qurban animal according to your needs..."
                                                    class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                                >${a(e.description_en||``)}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    type="button"
                                    class="remove-item-btn"
                                    data-index="${t}"
                                    title="Remove step"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join(``),d.querySelectorAll(`.remove-item-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.dataset.index||`0`);m.splice(t,1),h()})}))}f.addEventListener(`click`,()=>{m.push({title:``,title_en:``,description:``,description_en:``}),h()});try{let r=await t(e(n,`content`,`how_to_buy`));if(r.exists()){let e=r.data(),t=c.querySelector(`[name="subtitle"]`),n=c.querySelector(`[name="subtitle_en"]`);t&&(t.value=e.subtitle||``),n&&(n.value=e.subtitle_en||``),m=e.steps||[],h()}}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}c.addEventListener(`submit`,async t=>{t.preventDefault();let a=c.querySelector(`button[type="submit"]`);a&&(a.textContent=`Menyimpan...`,a.disabled=!0);try{let t=c.querySelector(`[name="subtitle"]`),a=c.querySelector(`[name="subtitle_en"]`),o=m.map((e,t)=>{let n=c.querySelector(`[name="step_title_${t}"]`),r=c.querySelector(`[name="step_title_${t}_en"]`),i=c.querySelector(`[name="step_description_${t}"]`),a=c.querySelector(`[name="step_description_${t}_en"]`);return{title:n?.value||``,title_en:r?.value||``,description:i?.value||``,description_en:a?.value||``}}).filter(e=>e.title&&e.description),s={subtitle:t?.value||``,subtitle_en:a?.value||``,steps:o,updatedAt:new Date().toISOString()};await r(e(n,`content`,`how_to_buy`),s),l.clearDraft(),u.markAsSaved(),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{a&&(a.textContent=`Simpan Perubahan`,a.disabled=!1)}}),document.addEventListener(`astro:before-swap`,()=>{l.stop(),u.stop()})});