import * as api from './api.js';
import * as ui from './ui.js';

async function handleMovieClick(movieId) {
  try {
    const movie = await api.getMovieDetails(movieId);
    ui.displayMovieDetails(movie);
  } catch (error) {
    console.error('handleMovieClick Error:', error);
  }
}

async function loadBestMovie() {
  try {
    const movie = await api.getBestMovie();
    const section = document.querySelector('[data-section="best-movie"]');

    ui.displayBestMovie(movie, section);

    const detailBtn = section.querySelector('button');
    detailBtn.addEventListener('click', () => handleMovieClick(movie.id));
  } catch (error) {
    console.error('loadBestMovie Error:', error);
  }
}

async function loadTopRated() {
  try {
    const movies = await api.getTopRatedMovies();
    ui.displayMovies(movies, '[data-grid="top-rated"]', handleMovieClick);
  } catch (error) {
    console.error('loadTopRated Error:', error);
  }
}

async function loadStaticCategories() {
  const categories = [
    { genre: 'Mystery', selector: '[data-grid="mystery"]' },
    { genre: 'Action', selector: '[data-grid="action"]' }
  ];

  await Promise.all(
    categories.map(async (category) => {
      try {
        const movies = await api.getMoviesByGenre(category.genre);
        ui.displayMovies(movies, category.selector, handleMovieClick);
      } catch (error) {
        console.error(`loadStaticCategories (${category.genre}) Error:`, error);
      }
    })
  );
}

async function loadOtherSections() {
  try {
    const genres = await api.getAllGenres();
    const sections = [
      {
        selectQuery: '[data-select="dynamic-1"]',
        gridQuery: '[data-grid="dynamic-1"]',
        defaultGenre: 'Family'
      },
      {
        selectQuery: '[data-select="dynamic-2"]',
        gridQuery: '[data-grid="dynamic-2"]',
        defaultGenre: 'Comedy'
      }
    ];

    await Promise.all(
      sections.map(async (section) => {
        const genreSelect = document.querySelector(section.selectQuery);

        ui.populateGenres(genres, section.selectQuery);
        genreSelect.value = section.defaultGenre;

        const initialMovies = await api.getMoviesByGenre(section.defaultGenre);
        ui.displayMovies(initialMovies, section.gridQuery, handleMovieClick);

        genreSelect.addEventListener('change', async (event) => {
          try {
            const selectedGenre = event.target.value;
            const genreMovies = await api.getMoviesByGenre(selectedGenre);
            ui.displayMovies(genreMovies, section.gridQuery, handleMovieClick);
          } catch (error) {
            console.error(`loadOtherSections (change ${event.target.value}) Error:`, error);
          }
        });
      })
    );
  } catch (error) {
    console.error('loadOtherSections Error:', error);
  }
}

async function init() {
  ui.setupModal();
  await Promise.all([loadBestMovie(), loadTopRated(), loadStaticCategories(), loadOtherSections()]);
}

init();
