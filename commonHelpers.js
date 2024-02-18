import{S as h,i as g}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const n={API_KEY:"42384910-73277182c896d015737fb8e33",API_URL:"https://pixabay.com/api/",ERROR_MESSAGES:{EMPTY_INPUT:"Input must not be empty. Please try again!",IMAGES_NOT_FOUND:"Sorry, there are no images matching your search query. Please try again!",RESOURSE_ERROR:"Requested resourse is not found!"}},y=document.querySelector(".form"),d=document.querySelector(".input"),u=document.querySelector(".gallery"),c=document.querySelector(".loader"),E={message:null,iconUrl:"/img/error-icon.png",messageColor:"white",backgroundColor:"#EF4040",position:"topRight"},p=new URLSearchParams({key:n.API_KEY,q:null,image_type:"photo",orientation:"horizontal",safesearch:!0});y.addEventListener("submit",s=>{s.preventDefault();const o=new h(".gallery-photo a");u.innerHTML="",d.value?(c.classList.remove("hidden"),p.set("q",`${d.value}`),fetch(`${n.API_URL}?${p}`,{headers:{Accept:"application/json"}}).then(r=>{if(r.ok)return r.json();throw c.classList.add("hidden"),new Error(r.status)}).then(r=>{r.hits.length?(u.insertAdjacentHTML("beforeend",R(r.hits)),o.refresh()):l(n.ERROR_MESSAGES.IMAGES_NOT_FOUND),c.classList.add("hidden")}).catch(r=>{console.debug(r),l(n.ERROR_MESSAGES.RESOURSE_ERROR)})):l(n.ERROR_MESSAGES.EMPTY_INPUT)});function R(s){return s.map(o=>{const{largeImageURL:r,webformatURL:a,tags:e,likes:t,views:i,comments:m,downloads:f}=o;return`<li>
      <div class="gallery-photo">
        <a href="${r}"
          ><img src="${a}" alt="${e}"
        /></a>
      </div>
      <div class="text-wrapper">
        <div class="list-item-container">
          <p class="header-text">likes</p>
          <p>${t}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Views</p>
          <p>${i}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Comments</p>
          <p>${m}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Downloads</p>
          <p>${f}</p>
        </div>
      </div>
    </li>`}).join("")}function l(s){g.show({...E,message:s})}
//# sourceMappingURL=commonHelpers.js.map
