import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";document.addEventListener(`astro:page-load`,()=>{let a=document.getElementById(`social-links-container`);if(!a)return;let o=document.getElementById(`add-link-btn`),s=document.getElementById(`save-btn`),c=[`Facebook`,`Instagram`,`Twitter`,`WhatsApp`,`YouTube`,`TikTok`,`LinkedIn`],l=[];async function u(){try{let r=await t(e(n,`content`,`social`));r.exists()&&(l=r.data().links||[]),d()}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}}function d(){a&&(a.innerHTML=``,l.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`flex gap-4 items-start p-4 bg-gray-50 rounded-lg`,n.innerHTML=`
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                    <select 
                        data-index="${t}" 
                        data-field="platform"
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    >
                        ${c.map(t=>`<option value="${t}" ${t===e.platform?`selected`:``}>${t}</option>`).join(``)}
                    </select>
                </div>
                <div class="flex-[2]">
                    <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
                    <input 
                        type="url" 
                        data-index="${t}" 
                        data-field="url"
                        value="${e.url}"
                        placeholder="https://..."
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    />
                </div>
                <div class="pt-6">
                    <button 
                        type="button" 
                        data-index="${t}"
                        class="remove-btn px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            `,a.appendChild(n)}),a.querySelectorAll(`select, input`).forEach(e=>{e.addEventListener(`change`,f)}),a.querySelectorAll(`.remove-btn`).forEach(e=>{e.addEventListener(`click`,p)}))}function f(e){let t=e.target,n=parseInt(t.dataset.index||`0`),r=t.dataset.field;l[n]&&(l[n][r]=t.value)}function p(e){let t=e.target,n=parseInt(t.dataset.index||`0`);l.splice(n,1),d()}o&&o.addEventListener(`click`,()=>{l.push({platform:c[0],url:``}),d()}),s&&s.addEventListener(`click`,async()=>{s.textContent=`Menyimpan...`,s.disabled=!0;try{let t={links:l,updatedAt:new Date().toISOString()};await r(e(n,`content`,`social`),t),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{s.textContent=`Simpan Perubahan`,s.disabled=!1}}),u()});