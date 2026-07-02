var e=class{container;constructor(){this.container=document.createElement(`div`),this.container.id=`toast-container`,this.container.className=`fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none`,document.body.appendChild(this.container)}show(e,t=`info`){document.body.contains(this.container)||document.body.appendChild(this.container);let n=document.createElement(`div`);switch(n.className=`
            pointer-events-auto 
            flex items-center gap-3 
            px-4 py-3 rounded-lg shadow-lg border 
            transform transition-all duration-300 ease-out translate-x-10 opacity-0
            min-w-[300px] max-w-sm
        `,t){case`success`:n.classList.add(`bg-white`,`border-emerald-100`,`text-slate-800`),n.innerHTML=`
                    <div class="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                `;break;case`error`:n.classList.add(`bg-white`,`border-rose-100`,`text-slate-800`),n.innerHTML=`
                    <div class="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                         <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                `;break;case`warning`:n.classList.add(`bg-white`,`border-amber-100`,`text-slate-800`),n.innerHTML=`
                     <div class="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                `;break;default:n.classList.add(`bg-white`,`border-sky-100`,`text-slate-800`),n.innerHTML=`
                     <div class="flex-shrink-0 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                `}let r=document.createElement(`span`);r.className=`text-sm font-medium leading-tight`,r.innerText=e,n.appendChild(r),this.container.appendChild(n),requestAnimationFrame(()=>{n.classList.remove(`translate-x-10`,`opacity-0`)}),setTimeout(()=>{n.classList.add(`opacity-0`,`translate-x-10`),setTimeout(()=>{n.remove()},300)},3e3)}},t=null,n=(n,r=`info`)=>{t||=new e,t.show(n,r)};typeof window<`u`&&(window.showToast=n);export{n as t};