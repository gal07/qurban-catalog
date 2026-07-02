import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";document.addEventListener(`astro:page-load`,()=>{let a=document.getElementById(`how-to-buy-form`);if(!a)return;let o=document.getElementById(`subtitle`),s=document.getElementById(`subtitle_en`),c=document.getElementById(`steps-container`),l=document.getElementById(`add-step-btn`),u=[];async function d(){try{let r=await t(e(n,`content`,`how_to`));if(r.exists()){let e=r.data();o&&(o.value=e.subtitle||``),s&&(s.value=e.subtitle_en||``);let t=e.steps||[];u=t.length>0?t[0].title_en===void 0?t.map(e=>({title:e.title||``,title_en:``,description:e.description||``,description_en:``})):t:[]}f()}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}}function f(){c&&(c.innerHTML=``,u.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`p-4 bg-gray-50 rounded-lg border border-gray-200`,n.innerHTML=`
                <div class="flex justify-between items-start mb-3">
                    <span class="text-sm font-semibold text-gray-700">Step ${t+1}</span>
                    <button 
                        type="button" 
                        data-index="${t}"
                        class="remove-step-btn text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Remove
                    </button>
                </div>
                <div class="space-y-4">
                    <!-- Title -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Title (ID)</label>
                            <input 
                                type="text" 
                                data-index="${t}" 
                                data-field="title"
                                value="${e.title}"
                                placeholder="e.g., Pilih Hewan"
                                class="step-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
                            <input 
                                type="text" 
                                data-index="${t}" 
                                data-field="title_en"
                                value="${e.title_en}"
                                placeholder="e.g., Choose Animal"
                                class="step-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            />
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description (ID)</label>
                            <textarea 
                                data-index="${t}" 
                                data-field="description"
                                rows="2"
                                placeholder="Describe this step..."
                                class="step-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            >${e.description}</textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
                            <textarea 
                                data-index="${t}" 
                                data-field="description_en"
                                rows="2"
                                placeholder="Describe this step..."
                                class="step-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            >${e.description_en}</textarea>
                        </div>
                    </div>
                </div>
            `,c.appendChild(n)}),c.querySelectorAll(`.step-input`).forEach(e=>{e.addEventListener(`change`,p)}),c.querySelectorAll(`.remove-step-btn`).forEach(e=>{e.addEventListener(`click`,m)}))}function p(e){let t=e.target,n=parseInt(t.dataset.index||`0`),r=t.dataset.field;u[n]&&(u[n][r]=t.value)}function m(e){let t=e.target,n=parseInt(t.dataset.index||`0`);u.splice(n,1),f()}l&&l.addEventListener(`click`,()=>{u.push({title:``,title_en:``,description:``,description_en:``}),f()}),a&&a.addEventListener(`submit`,async t=>{t.preventDefault();let c=a.querySelector(`button[type="submit"]`);c&&(c.textContent=`Menyimpan...`,c.disabled=!0);try{let t={subtitle:o.value,subtitle_en:s.value,steps:u,updatedAt:new Date().toISOString()};await r(e(n,`content`,`how_to`),t),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{c&&(c.textContent=`Simpan Perubahan`,c.disabled=!1)}}),d()});