import { getBestMovie, getTopRatedMovies, getMoviesByGenre, getAllGenres } from './api.js';
import { displayBestMovie, displayMovies, populateGenres } from './ui.js';

async function setupGenreSection(allGenres, selectSelector, gridSelector, defaultGenre) {
  const select = document.querySelector(selectSelector);
  const grid = document.querySelector(gridSelector);

  populateGenres(allGenres, selectSelector);
  select.value = defaultGenre;

  const movies = await getMoviesByGenre(defaultGenre);
  displayMovies(movies, gridSelector);

  select.addEventListener('change', async (e) => {
    grid.innerHTML = '';
    const selectedGenre = e.target.value;
    const movies = await getMoviesByGenre(selectedGenre);
    displayMovies(movies, gridSelector);
  });
}

async function init() {
  try {
    const bestMovie = await getBestMovie();
    displayBestMovie(bestMovie);
  } catch (error) {
    console.error('Erreur meilleur film :', error);
  }

  try {
    const topRatedMovies = await getTopRatedMovies();
    displayMovies(topRatedMovies, '[data-top-movies="grid"]');
  } catch (error) {
    console.error('Erreur films mieux notés :', error);
  }

  try {
    const mysteryMovies = await getMoviesByGenre('Mystery');
    displayMovies(mysteryMovies, '[data-category-1="grid"]');
  } catch (error) {
    console.error('Erreur Mystery :', error);
  }

  try {
    const actionMovies = await getMoviesByGenre('Action');
    displayMovies(actionMovies, '[data-category-2="grid"]');
  } catch (error) {
    console.error('Erreur Action :', error);
  }

  try {
    const allGenres = await getAllGenres();

    await setupGenreSection(
      allGenres,
      '[data-genre="select-1"]',
      '[data-category-3="grid"]',
      'Family'
    );

    await setupGenreSection(
      allGenres,
      '[data-genre="select-2"]',
      '[data-category-4="grid"]',
      'Comedy'
    );
  } catch (error) {
    console.error('Erreur sections genres :', error);
  }
}

init();
