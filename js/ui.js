const PLACEHOLDER = 'https://placehold.co/600x400?text=Image+non+disponible';

function setImageWithFallback(img, src, alt) {
  img.alt = alt;
  img.src = src;
  img.onerror = () => {
    img.onerror = null;
    img.src = PLACEHOLDER;
  };
}

export function displayBestMovie(movie, section) {
  const img = section.querySelector('img');
  setImageWithFallback(img, movie.image_url, movie.title);
  section.querySelector('h3').textContent = movie.title;
  section.querySelector('p').textContent = movie.description;
}

export function displayMovies(movies, gridSelector, onMovieClick) {
  const template = document.querySelector('#movie-template');
  const grid = document.querySelector(gridSelector);
  const section = grid.closest('section');
  const moreBtn = section.querySelector('[data-more-btn]');

  grid.innerHTML = '';
  if (moreBtn) moreBtn.classList.remove('hidden');

  movies.forEach((movie, index) => {
    const clone = template.content.cloneNode(true);
    const container = clone.querySelector('figure');

    switch (true) {
      case index >= 4:
        container.classList.add('hidden', 'lg:block');
        break;
      case index >= 2:
        container.classList.add('hidden', 'md:block');
        break;
    }

    setImageWithFallback(container.querySelector('img'), movie.image_url, movie.title);
    container.querySelector('h3').textContent = movie.title;
    container.querySelector('button').addEventListener('click', () => onMovieClick(movie.id));
    grid.appendChild(clone);
  });

  if (moreBtn) {
    moreBtn.onclick = () => {
      grid
        .querySelectorAll('.hidden')
        .forEach((el) => el.classList.remove('hidden', 'lg:block', 'md:block'));
      moreBtn.classList.add('hidden');
    };
  }
}

export function displayMovieDetails(movie) {
  const modal = document.querySelector('[data-modal="movie-details"]');
  const infoPs = modal.querySelectorAll('.info p');
  const imgs = modal.querySelectorAll('img');

  modal.querySelector('h3').textContent = movie.title;
  imgs.forEach((img) => {
    setImageWithFallback(img, movie.image_url, movie.title);
  });

  infoPs[0].textContent = `${movie.year} - ${movie.genres.join(', ')}`;
  infoPs[1].textContent = `${movie.rated} - ${movie.duration} minutes (${movie.countries.join(' / ')})`;
  infoPs[2].textContent = `IMDB score: ${movie.imdb_score}/10`;
  const income = movie.worldwide_gross_income;
  const formattedIncome =
    income != null ? `$${(income / 1000000).toLocaleString('en-US')}m` : 'N/A';
  infoPs[3].textContent = `Recettes au box-office: ${formattedIncome}`;

  modal.querySelector('.directors p:last-child').textContent = movie.directors.join(', ');
  modal.querySelector('.description').textContent = movie.long_description || movie.description;
  modal.querySelector('.actors').textContent = movie.actors.join(', ');
  document.body.style.overflow = 'hidden';
  modal.showModal();
}

export function setupModal() {
  const modal = document.querySelector('[data-modal="movie-details"]');
  const closeBtn = modal.querySelectorAll('[data-close-modal]');

  const closeModal = () => {
    modal.close();
    document.body.style.overflow = '';
  };

  closeBtn.forEach((btn) => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
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
