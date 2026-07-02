import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";import{n as a}from"./sanitize.UeGmBb_z.js";import{n as o,t as s}from"./UnsavedChanges.Dvd-coVg.js";var c=[`Facebook`,`Instagram`,`Twitter`,`WhatsApp`,`YouTube`,`TikTok`,`LinkedIn`];document.addEventListener(`astro:page-load`,async()=>{let l=document.getElementById(`social-form`);if(!l)return;let u=new o(`social-form`,l),d=new s(l),f=document.querySelector(`#social-list-container .list-items`),p=document.querySelector(`#social-list-container .add-item-btn`),m=document.querySelector(`#social-list-container .empty-state`);if(!f||!p||!m)return;let h=[];function g(){h.length===0?(f.innerHTML=``,m.classList.remove(`hidden`)):(m.classList.add(`hidden`),f.innerHTML=h.map((e,t)=>`
                            <div class="list-item" data-index="${t}">
                                <div class="list-item-content">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-slate-700 mb-1">
                                                Platform
                                            </label>
                                            <select
                                                name="platform_${t}"
                                                class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                            >
                                                <option value="">Select platform...</option>
                                                ${c.map(t=>`<option value="${t}" ${t===e.platform?`selected`:``}>${t}</option>`).join(``)}
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-slate-700 mb-1">
                                                URL
                                            </label>
                                            <input
                                                type="url"
                                                name="url_${t}"
                                                value="${a(e.url||``)}"
                                                placeholder="https://..."
                                                class="block w-full rounded-lg shadow-sm sm:text-sm px-4 py-2 border border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    type="button"
                                    class="remove-item-btn"
                                    data-index="${t}"
                                    title="Remove social link"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join(``),f.querySelectorAll(`.remove-item-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.dataset.index||`0`);h.splice(t,1),g()})}))}p.addEventListener(`click`,()=>{h.push({platform:``,url:``}),g()});try{let r=await t(e(n,`content`,`social`));r.exists()&&(h=r.data().links||[],g())}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}l.addEventListener(`submit`,async t=>{t.preventDefault();let a=l.querySelector(`button[type="submit"]`);a&&(a.textContent=`Menyimpan...`,a.disabled=!0);try{let t={links:h.map((e,t)=>{let n=l.querySelector(`[name="platform_${t}"]`),r=l.querySelector(`[name="url_${t}"]`);return{platform:n?.value||``,url:r?.value||``}}).filter(e=>e.platform&&e.url),updatedAt:new Date().toISOString()};await r(e(n,`content`,`social`),t),u.clearDraft(),d.markAsSaved(),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{a&&(a.textContent=`Simpan Perubahan`,a.disabled=!1)}}),document.addEventListener(`astro:before-swap`,()=>{u.stop(),d.stop()})});