import './css/styles.css';
import GetData from './js/fetch';
import { lightbox } from './js/lightbox';
import Notiflix from 'notiflix';

const getData = new GetData();

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

//-------------------------IF YOU NEED 'LOAD MORE' BUTTON
// const loadMore = document.querySelector('.load-more');

formEl.addEventListener('submit', onSearch);

//-------------------------IF YOU NEED 'LOAD MORE' BUTTON
// loadMore.addEventListener('click', onMakingMarkup);

function onSearch(event) {
  event.preventDefault();

  gallery.innerHTML = '';

  const input = event.currentTarget.searchQuery.value.trim();
  getData.resetPage();

  getData.inputValue = input;

  if (getData.searchQuery.trim() === '') {
    Notiflix.Notify.warning('Please, fill the main field');
    return;
  }

  onMakingMarkup();
}

async function onMakingMarkup() {
  //-------------------------IF YOU NEED 'LOAD MORE' BUTTON
  // loadMore.classList.add('visually-hidden');
  const response = await getData.onFetch();
  const { hits, totalHits } = response;

  if (hits.length === 0) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (gallery.children.length === 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  markup(hits);

  //-------------------------IF YOU NEED 'LOAD MORE' BUTTON
  // if (gallery.children.length < totalHits) {
  //   loadMore.classList.remove('visually-hidden');
  // }

  if (gallery.children.length >= totalHits) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    //-------------------------IF YOU NEED 'LOAD MORE' BUTTON
    // return loadMore.classList.add('visually-hidden');
  }

  //-------------------------IF YOU NEED 'LOAD MORE' BUTTON

  // if (gallery.children.length > getData.PER_PAGE) {
  //   const { height: cardHeight } = document
  //     .querySelector('.gallery')
  //     .firstElementChild.getBoundingClientRect();

  //   window.scrollBy({
  //     top: cardHeight * 2,
  //     behavior: 'smooth',
  //   });
  // }
}

function markup(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
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
          </div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


const onEntry = (entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting && getData.searchQuery !== "") {
          onMakingMarkup();
      }
  });
};

const options = {
  rootMargin: "200px"
};

const observer = new IntersectionObserver(onEntry, options);

const sentinel = document.querySelector('#sentinel');

observer.observe(sentinel);
