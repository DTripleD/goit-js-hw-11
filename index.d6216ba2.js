const e=document.querySelector(".search-form"),n=document.querySelector(".gallery");e.addEventListener("submit",(function(e){e.preventDefault();(function(e){const n=new URLSearchParams({key:"34891295-3c871ab0268d353f15c88782f",q:e,per_page:40});return fetch(`https://pixabay.com/api/?${n}&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>e.json()))})(e.currentTarget.searchQuery.value).then((e=>{if(e.hits==={})return console.log("Sorry, there are no images matching your search query. Please try again.");n.innerHTML=function(e){return e.map((({webformatURL:e,largeImageURL:n,tags:t,likes:a,views:r,comments:o,downloads:i})=>`<div class="photo-card">\n        <img src="${e}" alt="${t}" loading="lazy" />\n        <div class="info">\n            <p class="info-item">\n                <b>${a}</b>\n            </p>\n            <p class="info-item">\n                <b>${r}</b>\n            </p>\n            <p class="info-item">\n                <b>${o}</b>\n            </p>\n            <p class="info-item">\n                <b>${i}</b>\n            </p>\n        </div>\n    </div>`))}(e.hits)}))}));
//# sourceMappingURL=index.d6216ba2.js.map
