import { getBestMovie, getTopRatedMovies, getMoviesByGenre } from './api.js';
import { displayBestMovie, displayMovies } from './ui.js';

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
}

init();
