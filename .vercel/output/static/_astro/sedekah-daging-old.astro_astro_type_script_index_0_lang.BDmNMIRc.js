import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";document.addEventListener(`astro:page-load`,()=>{let a=document.getElementById(`sedekah-form`);if(!a)return;let o=document.getElementById(`badge`),s=document.getElementById(`title`),c=document.getElementById(`titleHighlight`),l=document.getElementById(`description`),u=document.getElementById(`buttonText`),d=document.getElementById(`badge_en`),f=document.getElementById(`title_en`),p=document.getElementById(`titleHighlight_en`),m=document.getElementById(`description_en`),h=document.getElementById(`buttonText_en`),g=document.getElementById(`buttonUrl`),_=document.getElementById(`imageUrl`),v=document.getElementById(`indicators-container`),y=document.getElementById(`add-indicator-btn`),b=[];async function x(){try{let r=await t(e(n,`content`,`sedekah_daging`));if(r.exists()){let e=r.data();o&&(o.value=e.badge||``),s&&(s.value=e.title||``),c&&(c.value=e.titleHighlight||``),l&&(l.value=e.description||``),u&&(u.value=e.buttonText||``),g&&(g.value=e.buttonUrl||``),_&&(_.value=e.imageUrl||``),d&&(d.value=e.badge_en||``),f&&(f.value=e.title_en||``),p&&(p.value=e.titleHighlight_en||``),m&&(m.value=e.description_en||``),h&&(h.value=e.buttonText_en||``);let t=e.trustIndicators||[];b=t.length>0?typeof t[0]==`string`?t.map(e=>({id:e,en:``})):t:[]}S()}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}}function S(){v&&(v.innerHTML=``,b.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`flex gap-2 items-start bg-gray-50 p-3 rounded-md`,n.innerHTML=`
                    <div class="flex-1 space-y-2">
                        <input 
                            type="text" 
                            data-index="${t}"
                            data-lang="id"
                            value="${e.id}"
                            placeholder="Indicator (ID)"
                            class="indicator-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                        <input 
                            type="text" 
                            data-index="${t}"
                            data-lang="en"
                            value="${e.en}"
                            placeholder="Indicator (EN)"
                            class="indicator-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                    <button 
                        type="button" 
                        data-index="${t}"
                        class="remove-indicator-btn px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors mt-1"
                    >
                        Remove
                    </button>
                `,v.appendChild(n)}),v.querySelectorAll(`.indicator-input`).forEach(e=>{e.addEventListener(`change`,C)}),v.querySelectorAll(`.remove-indicator-btn`).forEach(e=>{e.addEventListener(`click`,w)}))}function C(e){let t=e.target,n=parseInt(t.dataset.index||`0`),r=t.dataset.lang;b[n]&&(b[n][r]=t.value)}function w(e){let t=e.target,n=parseInt(t.dataset.index||`0`);b.splice(n,1),S()}y?.addEventListener(`click`,()=>{b.push({id:``,en:``}),S()}),a?.addEventListener(`submit`,async t=>{t.preventDefault();let v=a.querySelector(`button[type="submit"]`);v&&(v.textContent=`Menyimpan...`,v.disabled=!0);try{let t={badge:o.value,title:s.value,titleHighlight:c.value,description:l.value,buttonText:u.value,badge_en:d.value,title_en:f.value,titleHighlight_en:p.value,description_en:m.value,buttonText_en:h.value,buttonUrl:g.value,imageUrl:_.value,trustIndicators:b.filter(e=>e.id.trim()!==``||e.en.trim()!==``),updatedAt:new Date().toISOString()};await r(e(n,`content`,`sedekah_daging`),t),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{v&&(v.textContent=`Simpan Perubahan`,v.disabled=!1)}}),x()});