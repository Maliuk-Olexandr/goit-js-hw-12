import{S as w,i as l,a as E}from"./assets/vendor-DWXSRYDZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();function g(e){const o=document.querySelector(".gallery"),n=e.map(({webformatURL:i,largeImageURL:t,tags:r,likes:s,views:d,comments:m,downloads:v})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${t}">
              <img
                class="gallery-image" width="360" height="200"
                src="${i}"
                alt="${r}"
              />
            </a>
            <div class="info-card">
              <p class="info-item">
                <b>Likes</b> ${s}
              </p>
              <p class="info-item">
                <b>Views</b> ${d}
              </p>
              <p class="info-item">
                <b>Comments</b> ${m}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${v}
              </p>
          </li>`).join("");o.insertAdjacentHTML("beforeend",n),new w(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function H(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function y(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function b(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function $(){const e=document.querySelector(".pagination");e&&e.classList.remove("hidden")}function L(){const e=document.querySelector(".pagination");e&&e.classList.add("hidden")}function B(){setTimeout(()=>{const e=document.querySelector(".gallery-item");if(!e)return;const o=e.getBoundingClientRect().height+48;window.scrollBy({top:o*3,behavior:"smooth"})},300)}async function S(e,o=3,n=1){const i="https://pixabay.com/api/",t="50818720-8fed735658e97652981a6ffe2";if(!e||typeof e!="string"||e.trim()==="")return l.error({title:"Error",message:"Please enter a valid search query.",position:"topRight"}),{hits:[],totalHits:0};const r={key:t,q:e,image_type:"photo",per_page:o,page:n,orientation:"horizontal",safesearch:!0};try{const s=await E(i,{params:r}),{hits:d,totalHits:m}=s.data;return d.length===0?(l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),{hits:[],totalHits:0}):{hits:d,totalHits:m}}catch(s){return l.error({title:"Error",message:`An error occurred: ${s.message}`,position:"topRight"}),{hits:[],totalHits:0}}}let u=1,c=0,a=0,q="";const p=document.querySelector(".form"),h=document.querySelector(".button"),f=document.querySelector(".load-more");p.addEventListener("submit",e=>{h.disabled=!0,e.preventDefault(),u=1,c=0,H(),y();const o=document.querySelector(".total-hits span"),n=document.querySelector('[name="search-text"]').value.trim();a=Number(document.querySelector('[name="per-page"]').value),(!a||a<=0)&&(a=3),S(n,a,u).then(({hits:i,totalHits:t})=>{c=t,q=n,o.textContent=c,g(i),c>a?$():L()}).catch(i=>{l.error({title:"Error",message:`An error occurred: ${i.message}`,position:"topRight"})}).finally(()=>{b(),p.reset(),h.disabled=!1})});f.addEventListener("click",()=>{f.disabled=!0,u+=1,y(),S(q,a,u).then(({hits:e})=>{g(e),B(),u*a>=c&&(L(),l.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}).catch(e=>{l.error({title:"Error",message:`An error occurred: ${e.message}`,position:"topRight"})}).finally(()=>{b(),f.disabled=!1})});
//# sourceMappingURL=index.js.map
