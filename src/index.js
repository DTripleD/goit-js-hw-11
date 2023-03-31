import GetData from './js/fetch';
import {lightbox} from './js/lightbox'


const getData = new GetData();


const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

formEl.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onMakingMarkup);



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
        {
            return `<div class="photo-card">
            <a href="${largeImageURL}">
              <img class="gallery__item" src="${webformatURL}" alt="${tags}" loading="lazy">
            </a>
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
        }

    )
    .join('');
}

function onSearch(event) {
  event.preventDefault();

  gallery.innerHTML = '';
  getData.resetPage();

  const input = event.currentTarget.searchQuery.value.trim();

  getData.inputValue = input;

  onMakingMarkup();
}

async function onMakingMarkup() {
  const response = await getData.onFetch();
  const { hits, totalHits } = response;

  console.log(`Hooray! We found ${totalHits}npm install simplelightbox images.`);

    if (hits.length === 0) {
      loadMore.classList.add('visually-hidden');
      gallery.innerHTML = '';
      return console.log('Sorry, there are no images matching your search query. Please try again.');
    }
    lightbox.refresh();
    gallery.insertAdjacentHTML('beforeend', markup(hits));

    if (gallery.children.length >= totalHits) {
      console.log("We're sorry, but you've reached the end of search results.");
      return loadMore.classList.add('visually-hidden');
    }

    loadMore.classList.remove('visually-hidden');
  };


