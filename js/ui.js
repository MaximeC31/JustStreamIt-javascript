export function displayBestMovie(movie, section) {
  section.querySelector('img').src = movie.image_url;
  section.querySelector('img').alt = movie.title;
  section.querySelector('h3').textContent = movie.title;
  section.querySelector('p').textContent = movie.description;
}

export function displayMovies(movies, gridSelector, onMovieClick) {
  const template = document.querySelector('#movie-template');
  const grid = document.querySelector(gridSelector);
  grid.innerHTML = '';

  movies.forEach((movie) => {
    const clone = template.content.cloneNode(true);
    const container = clone.querySelector('figure');
    container.querySelector('img').src = movie.image_url;
    container.querySelector('img').alt = movie.title;
    container.querySelector('p').textContent = movie.title;
    container.querySelector('button').addEventListener('click', () => onMovieClick(movie.id));

    grid.appendChild(clone);
  });
}

export function displayMovieDetails(movie) {
  const modal = document.querySelector('[data-modal="movie-details"]');
  const infoPs = modal.querySelectorAll('.info p');

  modal.querySelector('h3').textContent = movie.title;
  modal.querySelector('img').src = movie.image_url;
  modal.querySelector('img').alt = movie.title;

  infoPs[0].textContent = `${movie.year} - ${movie.genres.join(', ')}`;
  infoPs[1].textContent = `${movie.rated} - ${movie.duration} minutes (${movie.countries.join(' / ')})`;
  infoPs[2].textContent = `IMDB score: ${movie.imdb_score}/10`;
  const income = movie.worldwide_gross_income;
  const formattedIncome = income ? `$${(income / 1000000).toLocaleString('en-US')}m` : 'N/A';
  infoPs[3].textContent = `Recettes au box-office: ${formattedIncome}`;

  modal.querySelector('.directors p:last-child').textContent = movie.directors.join(', ');
  modal.querySelector('.description').textContent = movie.long_description || movie.description;
  modal.querySelector('.actors').textContent = movie.actors.join(', ');

  modal.showModal();
}

export function setupModal() {
  const modal = document.querySelector('[data-modal="movie-details"]');
  const closeBtn = modal.querySelector('button');

  closeBtn.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

export function populateGenres(genres, selectSelector) {
  const select = document.querySelector(selectSelector);
  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre.name;
    option.textContent = genre.name;
    select.appendChild(option);
  });
}
