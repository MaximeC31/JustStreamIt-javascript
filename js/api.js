const BASE_URL = 'http://localhost:8000/api/v1';

export async function getBestMovie() {
  const response = await fetch(`${BASE_URL}/titles/?sort_by=-imdb_score&page_size=1`);
  const data = await response.json();
  const summary = data.results[0];

  const detailResponse = await fetch(`${BASE_URL}/titles/${summary.id}`);
  const movie = await detailResponse.json();

  return movie;
}

export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/titles/?sort_by=-imdb_score&page_size=6`);
  const data = await response.json();

  return data.results;
}

export async function getMoviesByGenre(genre) {
  const response = await fetch(
    `${BASE_URL}/titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`
  );
  const data = await response.json();

  return data.results;
}

export async function getAllGenres() {
  const genres = [];
  let url = `${BASE_URL}/genres/`;

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    genres.push(...data.results);
    url = data.next;
  }

  return genres;
}
