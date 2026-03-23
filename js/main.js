import * as api from './api.js';
import * as ui from './ui.js';

async function loadBestMovie() {
  try {
    const movie = await api.getBestMovie();
    ui.displayBestMovie(movie);
  } catch (e) {
    console.error('Best Movie:', e);
  }
}

async function loadTopRated() {
  try {
    const movies = await api.getTopRatedMovies();
    ui.displayMovies(movies, '[data-grid-top-rated]');
  } catch (e) {
    console.error('Top Rated:', e);
  }
}

async function loadStaticCategories() {
  const categories = [
    { genre: 'Mystery', selector: '[data-grid-mystery]' },
    { genre: 'Action', selector: '[data-grid-action]' }
  ];

  try {
    await Promise.all(
      categories.map(async (category) => {
        try {
          const movies = await api.getMoviesByGenre(category.genre);
          ui.displayMovies(movies, category.selector);
        } catch (e) {
          console.error(`${category.genre}:`, e);
        }
      })
    );
  } catch (e) {
    console.error('Static Categories:', e);
  }
}

async function loadOtherSections() {
  try {
    const genres = await api.getAllGenres();
    const sections = [
      { selectQuery: '[data-select-dynamic-1]', gridQuery: '[data-grid-dynamic-1]' },
      { selectQuery: '[data-select-dynamic-2]', gridQuery: '[data-grid-dynamic-2]' }
    ];

    await Promise.all(
      sections.map(async (section) => {
        const genreSelect = document.querySelector(section.selectQuery);
        const movieGrid = document.querySelector(section.gridQuery);
        const initialGenre = genreSelect.getAttribute('defaultValue');

        ui.populateGenres(genres, section.selectQuery);
        genreSelect.value = initialGenre;

        const initialMovies = await api.getMoviesByGenre(initialGenre);
        ui.displayMovies(initialMovies, section.gridQuery);

        genreSelect.addEventListener('change', async (event) => {
          movieGrid.innerHTML = '';
          const selectedGenre = event.target.value;
          const genreMovies = await api.getMoviesByGenre(selectedGenre);
          ui.displayMovies(genreMovies, section.gridQuery);
        });
      })
    );
  } catch (error) {
    console.error('Error loading other sections:', error);
  }
}

async function init() {
  await Promise.all([loadBestMovie(), loadTopRated(), loadStaticCategories(), loadOtherSections()]);
}

init();
