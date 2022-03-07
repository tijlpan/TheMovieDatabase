//refs

const form = document.querySelector(".container_form");
const veld = document.querySelector(".container_form_search");
const lijst = document.querySelector(".container_wrap");
const popular = getPopular();

form.onsubmit = function (e) {
   e.preventDefault();
   const trending = document.querySelector("#title");
   trending.innerHTML = `Searchresults for your search: "${veld.value}"`;
   let search = getSearch(veld.value);
   if (veld.value === '') { 
       search = getPopular();
        trending.innerHTML = 'Trending Movies';
   }
   getRender(search);
 };

async function getPopular() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=72fc53dc643a6547fc810d970fa534e9&language=en`
  );
  const popularData = await response.json();
  return popularData;
}
 async function getGenres() {
     const response = await fetch(
         'https://api.themoviedb.org/3/genre/movie/list?api_key=72fc53dc643a6547fc810d970fa534e9&language=en'
     );
     const genreData = await response.json();
     return genreData;
 }
 async function getSearch(value) {
     const response = await fetch(
         `https://api.themoviedb.org/3/search/movie?api_key=72fc53dc643a6547fc810d970fa534e9&language=en&query="${value}"`
     )
     const searchData = await response.json();
     return searchData;
 }

async function getRender(data) {
  const renderData = await data;
  const genres = await getGenres();
  //genres zijn duidelijk nog niet helemaal correct
  const genreArr = renderData.results[0].genre_ids.map(id => genres.genres.filter(genre => genre.id == id)[0].name.toLowerCase());
  lijst.innerHTML = renderData.results
    .map(
      (movie) =>
      `<article class="container_wrap_article">
      <div class="container_wrap_article_imgholder">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="profile image">
      </div>
      <div class="container_wrap_article_text">
          <h3 class="container_wrap_article_text_title">${movie.title}</h3>
          <h4 class="container_wrap_article_text_genre">(${genreArr})</h4>
      </div>
      </article>`
      )
    .join("");
}
getRender(popular);