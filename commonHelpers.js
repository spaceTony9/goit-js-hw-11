import{S as u,i as c}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m=document.querySelector(".form"),l=document.querySelector(".input"),d=document.querySelector(".gallery"),a=document.querySelector(".loader"),p=new URLSearchParams({key:"42384910-73277182c896d015737fb8e33",q:null,image_type:"photo",orientation:"horizontal",safesearch:!0});m.addEventListener("submit",n=>{const o=new u(".gallery-photo a");n.preventDefault(),d.innerHTML="",l.value===""?c.show({message:"Input must not be empty. Please try again!",iconUrl:"./img/error-icon.png",messageColor:"white",backgroundColor:"#EF4040",position:"topRight"}):(a.classList.remove("hidden"),p.set("q",`${l.value}`),fetch(`https://pixabay.com/api/?${p}`,{headers:{Accept:"application/json"}}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length<1)a.classList.add("hidden"),c.show({message:"Sorry, there are no images matching your search query. Please try again!",iconUrl:"./img/error-icon.png",messageColor:"white",backgroundColor:"#EF4040",position:"topRight"});else{const s=r.hits.map(e=>`<li>
      <div class="gallery-photo">
        <a href="${e.largeImageURL}"
          ><img src="${e.webformatURL}" alt="${e.tags}"
        /></a>
      </div>
      <div class="text-wrapper">
        <div class="list-item-container">
          <p class="header-text">likes</p>
          <p>${e.likes}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Views</p>
          <p>${e.views}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Comments</p>
          <p>${e.comments}</p>
        </div>
        <div class="list-item-container">
          <p class="header-text">Downloads</p>
          <p>${e.downloads}</p>
        </div>
      </div>
    </li>`).join("");a.classList.add("hidden"),d.insertAdjacentHTML("beforeend",s),o.refresh()}}).catch(r=>{console.log(r)}))});
//# sourceMappingURL=commonHelpers.js.map
