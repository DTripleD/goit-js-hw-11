const formEl = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");

formEl.addEventListener("submit", onSearch);

function getData(query){
    const API_KEY = '34891295-3c871ab0268d353f15c88782f';
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        per_page: 40,
      });


    return fetch(`https://pixabay.com/api/?${params}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json())
    // when markap will be done use lower return !!!!!!!!!!!
    // return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json())
}




function markup(data){
    return data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>${likes}</b>
            </p>
            <p class="info-item">
                <b>${views}</b>
            </p>
            <p class="info-item">
                <b>${comments}</b>
            </p>
            <p class="info-item">
                <b>${downloads}</b>
            </p>
        </div>
    </div>`)
}

function onSearch(event){
    event.preventDefault();

    const inputValue = event.currentTarget.searchQuery.value;


    getData(inputValue).then((data) => {
        if(data.hits === {}){
            return console.log("Sorry, there are no images matching your search query. Please try again.");
        }

        gallery.innerHTML = markup(data.hits);
    
    });



    




    

    
}





