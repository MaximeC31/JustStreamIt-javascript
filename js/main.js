import { getBestMovie } from './api.js';
import { displayBestMovie } from './ui.js';

async function init() {
  const bestMovie = await getBestMovie();
  displayBestMovie(bestMovie);
}

init();
