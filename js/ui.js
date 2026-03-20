export function displayBestMovie(movie) {
  document.querySelector('[data-best-movie="img"]').src = movie.image_url;
  document.querySelector('[data-best-movie="img"]').alt = movie.title;
  document.querySelector('[data-best-movie="title"]').textContent = movie.title;
  document.querySelector('[data-best-movie="description"]').textContent = movie.description;
}
