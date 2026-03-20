import { getBestMovie, getTopRatedMovies } from "./api.js";
import { displayBestMovie, displayTopRatedMovies } from "./ui.js";

async function init() {
  try {
    const bestMovie = await getBestMovie();
    displayBestMovie(bestMovie);
  } catch (error) {
    console.error("Erreur meilleur film :", error);
  }

  try {
    const topRatedMovies = await getTopRatedMovies();
    displayTopRatedMovies(topRatedMovies);
  } catch (error) {
    console.error("Erreur films mieux notés :", error);
  }
}

init();
