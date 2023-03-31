const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

formEl.addEventListener('submit', onSearch);
// loadMore.addEventListener("click", onLoadMoreClick);

function onLoadMoreClick() {
  if (gallery.innerHTML !== '') {
    return loadMore.classList.remove('visually-hidden');
  }
}

function getData(query) {
  const API_KEY = '34891295-3c871ab0268d353f15c88782f';
  let page = 1;
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: 40,
    page,
  });

  return fetch(
    `https://pixabay.com/api/?${params}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => response.json());
  // when markap will be done use lower return !!!!!!!!!!!
  // return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json())
}

function markup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <img class="gallery__item" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes: </b>
                ${likes}
            </p>
            <p class="info-item">
                <b>Views: </b>
                ${views}
            </p>
            <p class="info-item">
                <b>Comments: </b>
                ${comments}
            </p>
            <p class="info-item">
                <b>Downloads: </b>
                ${downloads}
            </p>
        </div>
    </div>`
    )
    .join('');
}

function onSearch(event) {
  event.preventDefault();

  onLoadMoreClick();

  const inputValue = event.currentTarget.searchQuery.value;

  getData(inputValue).then(data => {
    // if (data.hits === {}) {
    //   return console.log(
    //     'Sorry, there are no images matching your search query. Please try again.'
    //   );
    // }
    return console.log(data);

    gallery.innerHTML = markup(data.hits);
  });
}
