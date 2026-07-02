import{i as e,r as t,t as n}from"./firebase.BQ-67cyO.js";t(n,e=>{e&&(window.location.href=`/admin/dashboard`)});var r=document.getElementById(`login-form`),i=document.getElementById(`error-message`);r?.addEventListener(`submit`,async t=>{t.preventDefault();let a=document.getElementById(`email`).value,o=document.getElementById(`password`).value,s=r.querySelector(`button`);s?.querySelector(`span`)?.nextSibling;try{s&&(s.disabled=!0,s.innerHTML=`Memproses...`),i?.classList.add(`hidden`),await e(n,a,o)}catch(e){console.error(e),i&&(i.classList.remove(`hidden`),i.querySelector(`p`).textContent=`Login gagal. Periksa email dan password.`),s&&(s.innerHTML=`
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-sky-500 group-hover:text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Masuk
          `,s.disabled=!1)}});