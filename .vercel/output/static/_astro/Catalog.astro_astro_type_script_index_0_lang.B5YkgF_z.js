import{d as e,f as t,g as n,l as r,m as i,n as a,u as o}from"./firebase.BQ-67cyO.js";var s=(e,t,n)=>n===`en`?e[`${t}_en`]||e[`${t}_id`]||e[t]||``:e[`${t}_id`]||e[t]||``,c=e=>{let t=`; ${document.cookie}`.split(`; ${e}=`);return t.length===2?t.pop()?.split(`;`).shift():`id`},l=null,u=9,d=!1;async function f(f=!1){let p=document.getElementById(`animal-grid`),m=document.getElementById(`loading`),h=document.getElementById(`empty-state`),g=document.getElementById(`btn-load-more`),_=document.getElementById(`load-more-container`);if(!(!p||!m||!h||!g||!_)&&!d){d=!0;try{f?(g.textContent=`Memuat...`,g.setAttribute(`disabled`,`true`)):(p.hasChildNodes()||(m.style.display=`block`),h.classList.add(`hidden`),_.classList.add(`hidden`));let v=`628123456789`,y=`Halo, saya tertarik dengan hewan qurban {name} seharga {price}. Apakah masih tersedia?`,b=`Hello, I am interested in qurban animal {name} price {price}. Is it available?`;if(!f||!window.catalogSettings){let e=await r(n(a,`setting_wa`));if(!e.empty){let t=e.docs[0].data();t.whatsappNumber&&(v=t.whatsappNumber),t.messageTemplate_id?y=t.messageTemplate_id:t.messageTemplate&&(y=t.messageTemplate),t.messageTemplate_en&&(b=t.messageTemplate_en),window.catalogSettings={waNumber:v,waTemplateId:y,waTemplateEn:b}}}else v=window.catalogSettings.waNumber,y=window.catalogSettings.waTemplateId,b=window.catalogSettings.waTemplateEn;let x,S=n(a,`animals`);x=f&&l?t(S,e(`available`,`desc`),e(`name`,`asc`),i(l),o(u)):t(S,e(`available`,`desc`),e(`name`,`asc`),o(u));let C;try{C=await r(x)}catch(n){let a=n;if(a.code===`failed-precondition`||a.message?.includes(`index`))console.warn(`⚠️ Firestore Index Missing. Falling back to simple sort.`,n),console.log(`👉 Click the link in the error above to create the index!`),x=f&&l?t(S,e(`name`,`asc`),i(l),o(u)):t(S,e(`name`,`asc`),o(u)),C=await r(x);else throw n}if(m.style.display=`none`,g.textContent=`Muat Lebih Banyak`,g.removeAttribute(`disabled`),C.empty){f||(p.innerHTML=``,h.classList.remove(`hidden`)),_.classList.add(`hidden`),d=!1;return}l=C.docs[C.docs.length-1],f||(p.innerHTML=``);let w=c(`app_lang`)||`id`;C.forEach(e=>{let t=e.data(),n=t.available,r=s(t,`name`,w),i=s(t,`description`,w);i||=w===`en`?`Quality qurban animal, healthy and according to sharia.`:`Hewan qurban berkualitas, sehat dan sesuai syariat.`;let a=`Rp `+Number(t.price).toLocaleString(`id-ID`),o=(w===`en`?b:y).replace(/{name}/g,r).replace(/{price}/g,a),c=`https://wa.me/${v}?text=${encodeURIComponent(o)}`,l=document.createElement(`div`);l.className=`animal-grid-item`;let u=t.imageUrl||`https://placehold.co/400x300/e2e8f0/1e293b?text=${encodeURIComponent(r)}`;l.innerHTML=`
                <div class="animal-card ${n?``:`sold-out`}">
                    <div class="card-image-wrapper">
                        <img src="${u}" alt="${r}" loading="lazy" class="card-img" width="400" height="300" />
                        ${n?``:`<div class="sold-overlay"><span>TERJUAL</span></div>`}
                        <div class="card-badges">
                             <span class="badge-pill ${t.type===`Sapi`?`badge-cow`:`badge-goat`}">${t.type}</span>
                             <span class="badge-pill badge-weight">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                                ${t.weight} Kg
                             </span>
                        </div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${t.name}</h3>
                        <p class="card-desc">${t.description||`Hewan qurban berkualitas, sehat dan sesuai syariat.`}</p>
                        
                        <div class="card-pricing">
                            <span class="price-label">Harga Spesial</span>
                            <span class="price-value">${a}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="${c}" 
                           class="btn btn-whatsapp ${n?``:`btn-disabled`}"
                           ${n?``:`disabled`}
                           target="_blank"
                           rel="noopener noreferrer">
                           <span>${n?`Pesan via WhatsApp`:`Habis Terjual`}</span>
                        </a>
                    </div>
                </div>
            `,l.className=`animal-card ${n?``:`sold-out`}`,l.innerHTML=`
             <div class="card-image-wrapper">
                 <img src="${u}" alt="${t.name}" loading="lazy" class="card-img" />
                 ${n?``:`<div class="sold-overlay"><span>TERJUAL</span></div>`}
                 <div class="card-badges">
                      <span class="badge-pill ${t.type===`Sapi`?`badge-cow`:`badge-goat`}">${t.type}</span>
                      <span class="badge-pill badge-weight">
                         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
                         ${t.weight} Kg
                      </span>
                 </div>
             </div>
             <div class="card-content">
                 <h3 class="card-title">${r}</h3>
                 <p class="card-desc">${i}</p>
                 
                 <div class="card-pricing">
                     <span class="price-label">Harga Spesial</span>
                     <span class="price-value">${a}</span>
                 </div>
             </div>
             <div class="card-footer" style="${t.urlCampaign?`display: grid; grid-template-columns: 10fr 2fr; gap: 0.5rem;`:``}">
                 ${t.urlCampaign?`
                    <a href="${t.urlCampaign}" 
                       class="btn btn-campaign"
                       target="_blank"
                       rel="noopener noreferrer"
                       onclick="event.stopPropagation()">
                       Beli Sekarang
                    </a>
                 `:``}
                 <a href="${c}" 
                    class="btn btn-whatsapp ${t.urlCampaign?`icon-only`:`full-width`} ${n?``:`btn-disabled`}"
                    ${n?``:`disabled`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat WhatsApp"
                    onclick="event.stopPropagation()">
                                          ${t.urlCampaign?`<i class="fab fa-whatsapp btn-icon-fa"></i>`:`
                            <span>Pesan via WhatsApp</span>
                           `}
                        </a>
             </div>
        `,l.addEventListener(`click`,()=>{window.openProductModal&&window.openProductModal(t,a,c)}),l.style.cursor=`pointer`,p.appendChild(l)}),C.size<u?_.classList.add(`hidden`):_.classList.remove(`hidden`)}catch(e){console.error(`Error loading catalogue:`,e);let t=e;t.message&&t.message.includes(`indexes`)&&console.warn(`Firestore Index Required: Check console for link to create index.`),m.innerHTML=`
            <div class="error-state">
                <p>⚠️ Gagal memuat data katalog.</p>
                <button onclick="window.location.reload()" class="btn btn-sm btn-primary">Muat Ulang</button>
            </div>
        `}finally{d=!1}}}document.addEventListener(`astro:page-load`,()=>{l=null,d=!1,f(!1);let e=document.getElementById(`btn-load-more`);e&&e.addEventListener(`click`,()=>{f(!0)});let t=document.getElementById(`animal-grid`),n=document.getElementById(`slider-prev`),r=document.getElementById(`slider-next`);t&&n&&r&&(window.innerWidth<=768&&(n.classList.remove(`hidden`),r.classList.remove(`hidden`)),n.addEventListener(`click`,()=>{t.scrollBy({left:-280,behavior:`smooth`})}),r.addEventListener(`click`,()=>{t.scrollBy({left:280,behavior:`smooth`})}),t.addEventListener(`scroll`,()=>{if(window.innerWidth<=768&&!d){let{scrollLeft:e,scrollWidth:n,clientWidth:r}=t;e+r>=n-50&&f(!0)}}));let i=document.getElementById(`product-modal`),a=document.getElementById(`modal-close`);document.querySelector(`.modal-backdrop`);function o(){i&&(i.classList.remove(`active`),setTimeout(()=>{i.classList.add(`hidden`)},300),document.body.style.overflow=``)}a&&a.addEventListener(`click`,o),i&&(i.addEventListener(`click`,e=>{e.target===i&&o()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&i.classList.contains(`active`)&&o()}))}),window.openProductModal=(e,t,n)=>{let r=document.getElementById(`product-modal`);if(!r)return;let i=c(`app_lang`)||`id`,a=document.getElementById(`modal-img`),o=document.getElementById(`modal-title`),l=document.getElementById(`modal-price`),u=document.getElementById(`modal-desc`),d=document.getElementById(`modal-type`),f=document.getElementById(`modal-weight`),p=document.getElementById(`modal-weight-text`),m=document.getElementById(`modal-type-text`),h=document.getElementById(`modal-sold-overlay`),g=document.getElementById(`modal-wa-btn`),_=document.getElementById(`modal-campaign-btn`),v=document.getElementById(`modal-footer`),y=s(e,`name`,i),b=s(e,`description`,i);b||=i===`en`?`Quality qurban animal.`:`Hewan qurban berkualitas.`,a&&(a.src=e.imageUrl||`https://placehold.co/400x300/e2e8f0/1e293b?text=${encodeURIComponent(y)}`),o&&(o.textContent=y),l&&(l.textContent=t),u&&(u.textContent=b),d&&(d.textContent=e.type,d.className=`badge-pill ${e.type===`Sapi`?`badge-cow`:`badge-goat`}`),m&&(m.textContent=e.type),f&&(f.innerHTML=`
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path></svg>
           ${e.weight} Kg
        `),p&&(p.textContent=`${e.weight} Kg`),h&&(e.available===!1?h.classList.remove(`hidden`):h.classList.add(`hidden`)),_&&(e.urlCampaign?(_.href=e.urlCampaign,_.classList.remove(`hidden`)):_.classList.add(`hidden`)),g&&(g.href=n,g.className=`btn btn-whatsapp`,e.available===!1?(g.classList.add(`btn-disabled`,`full-width`),g.style.pointerEvents=`none`,g.textContent=i===`en`?`Sold Out`:`Habis Terjual`):(g.classList.remove(`btn-disabled`),g.style.pointerEvents=`auto`,e.urlCampaign?(g.classList.add(`icon-only`),g.innerHTML=`<i class="fab fa-whatsapp btn-icon-fa"></i>`):(g.classList.add(`full-width`),g.innerHTML=`<i class="fab fa-whatsapp btn-icon-fa"></i> <span>${i===`en`?`Order on WhatsApp`:`Pesan via WhatsApp`}</span>`))),v&&(e.urlCampaign&&e.available!==!1?(v.style.display=`grid`,v.style.gridTemplateColumns=`10fr 2fr`,v.style.gap=`0.5rem`):(v.style.display=`flex`,v.style.gap=`0.75rem`)),r.classList.remove(`hidden`),requestAnimationFrame(()=>{r.classList.add(`active`)}),document.body.style.overflow=`hidden`};