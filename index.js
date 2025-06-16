import{S as v,a as E,i as c}from"./assets/vendor-DWXSRYDZ.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();function g(e){const o=document.querySelector(".gallery"),i=e.map(({webformatURL:s,largeImageURL:t,tags:r,likes:n,views:d,comments:m,downloads:w})=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${t}">
              <img
                class="gallery-image" width="360" height="200"
                src="${s}"
                alt="${r}"
              />
            </a>
            <div class="info-card">
              <p class="info-item">
                <b>Likes</b> ${n}
              </p>
              <p class="info-item">
                <b>Views</b> ${d}
              </p>
              <p class="info-item">
                <b>Comments</b> ${m}
              </p>
              <p class="info-item">
                <b>Downloads</b> ${w}
              </p>
          </li>`).join("");o.insertAdjacentHTML("beforeend",i),new v(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function P(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function b(){const e=document.querySelector(".loader");e&&e.classList.remove("hidden")}function y(){const e=document.querySelector(".loader");e&&e.classList.add("hidden")}function $(){const e=document.querySelector(".pagination");e&&e.classList.remove("hidden")}function L(){const e=document.querySelector(".pagination");e&&e.classList.add("hidden")}function B(){setTimeout(()=>{const e=document.querySelector(".gallery-item");if(!e)return;const o=e.getBoundingClientRect().height+48;window.scrollBy({top:o*2,behavior:"smooth"})},300)}async function q(e,o=3,i=1){const s="https://pixabay.com/api/",r={key:"50818720-8fed735658e97652981a6ffe2",q:e,image_type:"photo",per_page:o,page:i,orientation:"horizontal",safesearch:!0};try{const n=await E(s,{params:r}),{hits:d,totalHits:m}=n.data;return d.length===0?(c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),{hits:[],totalHits:0}):{hits:d,totalHits:m}}catch(n){return c.error({title:"Error",message:`An error occurred: ${n.message}`,position:"topRight"}),{hits:[],totalHits:0}}}let u=1,l=0,a=0,S="";const h=document.querySelector(".form"),f=document.querySelector(".button"),p=document.querySelector(".load-more");h.addEventListener("submit",async e=>{e.preventDefault(),f.disabled=!0,u=1,l=0,P(),b();const o=document.querySelector(".total-hits span"),i=document.querySelector('[name="search-text"]').value.trim();if(!i){c.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"}),y(),f.disabled=!1;return}a=Number(document.querySelector('[name="per-page"]').value),(!a||a<=0)&&(a=6);try{const{hits:s,totalHits:t}=await q(i,a,u);l=t,S=i,o.textContent=l,g(s),l>a?$():L()}catch(s){c.error({title:"Error",message:`An error occurred: ${s.message}`,position:"topRight"})}finally{y(),f.disabled=!1,h.reset()}});p.addEventListener("click",async()=>{p.disabled=!0,u+=1,b();try{const{hits:e}=await q(S,a,u);g(e),u*a>=l&&(L(),c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),B()}catch(e){c.error({title:"Error",message:`An error occurred: ${e.message}`,position:"topRight"})}finally{y(),p.disabled=!1}});
//# sourceMappingURL=index.js.map
