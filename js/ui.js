export function displayBestMovie(movie) {
  document.querySelector('[data-best-movie="img"]').src = movie.image_url;
  document.querySelector('[data-best-movie="img"]').alt = movie.title;
  document.querySelector('[data-best-movie="title"]').textContent = movie.title;
  document.querySelector('[data-best-movie="description"]').textContent = movie.description;
}

export function displayTopRatedMovies(movies) {
  const template = document.querySelector('#top-movie-template');
  const grid = document.querySelector('[data-top-movies="grid"]');

  movies.forEach((movie) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('img').src = movie.image_url;
    clone.querySelector('img').alt = movie.title;
    clone.querySelector('p').textContent = movie.title;
    grid.appendChild(clone);
  });
}
