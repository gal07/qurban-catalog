import{_ as e,c as t,n,p as r}from"./firebase.BQ-67cyO.js";import{t as i}from"./toast.DZnngjJy.js";document.addEventListener(`astro:page-load`,()=>{let a=document.getElementById(`hero-form`);if(!a)return;let o=document.getElementById(`badge`),s=document.getElementById(`title`),c=document.getElementById(`titleHighlight`),l=document.getElementById(`description`),u=document.getElementById(`catalogTitle`),d=document.getElementById(`catalogSubtitle`),f=document.getElementById(`badge_en`),p=document.getElementById(`title_en`),m=document.getElementById(`titleHighlight_en`),h=document.getElementById(`description_en`),g=document.getElementById(`catalogTitle_en`),_=document.getElementById(`catalogSubtitle_en`),v=document.getElementById(`features-container`),y=document.getElementById(`add-feature-btn`),b=[];async function x(){try{let r=await t(e(n,`content`,`hero`));if(r.exists()){let e=r.data();o&&(o.value=e.badge_id||e.badge||``),s&&(s.value=e.title_id||e.title||``),c&&(c.value=e.titleHighlight_id||e.titleHighlight||``),l&&(l.value=e.description_id||e.description||``),u&&(u.value=e.catalogTitle_id||e.catalogTitle||``),d&&(d.value=e.catalogSubtitle_id||e.catalogSubtitle||``),f&&(f.value=e.badge_en||``),p&&(p.value=e.title_en||``),m&&(m.value=e.titleHighlight_en||``),h&&(h.value=e.description_en||``),g&&(g.value=e.catalogTitle_en||``),_&&(_.value=e.catalogSubtitle_en||``);let t=e.features||[];b=Array.isArray(t)&&t.length>0?typeof t[0]==`string`?t.map(e=>({id:e,en:``})):t:[]}S()}catch(e){console.error(`Error loading data:`,e),i(`Gagal memuat data. Silakan coba lagi.`,`error`)}}function S(){v&&(v.innerHTML=``,b.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`flex gap-2 items-start bg-gray-50 p-3 rounded-md`,n.innerHTML=`
                <div class="flex-1 space-y-2">
                    <input 
                        type="text" 
                        data-index="${t}"
                        data-lang="id"
                        value="${e.id}"
                        placeholder="Feature (ID)"
                        class="feature-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    />
                    <input 
                        type="text" 
                        data-index="${t}"
                        data-lang="en"
                        value="${e.en}"
                        placeholder="Feature (EN)"
                        class="feature-input w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    />
                </div>
                <button 
                    type="button" 
                    data-index="${t}"
                    class="remove-feature-btn px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors mt-1"
                >
                    Remove
                </button>
            `,v.appendChild(n)}),v.querySelectorAll(`.feature-input`).forEach(e=>{e.addEventListener(`change`,C)}),v.querySelectorAll(`.remove-feature-btn`).forEach(e=>{e.addEventListener(`click`,w)}))}function C(e){let t=e.target,n=parseInt(t.dataset.index||`0`),r=t.dataset.lang;b[n]&&(b[n][r]=t.value)}function w(e){let t=e.target,n=parseInt(t.dataset.index||`0`);b.splice(n,1),S()}y&&y.addEventListener(`click`,()=>{b.push({id:``,en:``}),S()}),a&&a.addEventListener(`submit`,async t=>{t.preventDefault();let v=a.querySelector(`button[type="submit"]`);v&&(v.textContent=`Menyimpan...`,v.disabled=!0);try{let t={badge_id:o.value,title_id:s.value,titleHighlight_id:c.value,description_id:l.value,catalogTitle_id:u.value,catalogSubtitle_id:d.value,badge:o.value,title:s.value,titleHighlight:c.value,description:l.value,catalogTitle:u.value,catalogSubtitle:d.value,badge_en:f.value,title_en:p.value,titleHighlight_en:m.value,description_en:h.value,catalogTitle_en:g.value,catalogSubtitle_en:_.value,features:b.filter(e=>e.id.trim()!==``||e.en.trim()!==``),updatedAt:new Date().toISOString()};await r(e(n,`content`,`hero`),t),i(`Data berhasil disimpan!`,`success`)}catch(e){console.error(`Error saving data:`,e),i(`Gagal menyimpan data: `+e.message,`error`)}finally{v&&(v.textContent=`Simpan Perubahan`,v.disabled=!1)}}),x()});