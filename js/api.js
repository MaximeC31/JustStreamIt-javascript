const BASE_URL = 'http://localhost:8000/api/v1';

export async function getBestMovie() {
  const response = await fetch(`${BASE_URL}/titles/?sort_by=-imdb_score&page_size=1`);
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
  const data = await response.json();
  const summary = data.results[0];

  const detailResponse = await fetch(`${BASE_URL}/titles/${summary.id}`);
  if (!detailResponse.ok) throw new Error(`HTTP ${detailResponse.status} ${detailResponse.url}`);

  return await detailResponse.json();
}

export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/titles/?sort_by=-imdb_score&page_size=6`);
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
  const data = await response.json();

  return data.results;
}

export async function getMoviesByGenre(genre) {
  const response = await fetch(
    `${BASE_URL}/titles/?genre=${genre}&sort_by=-imdb_score&page_size=6`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
  const data = await response.json();

  return data.results;
}

export async function getAllGenres() {
  const genres = [];
  let url = `${BASE_URL}/genres/`;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.url}`);
    const data = await response.json();
    genres.push(...data.results);
    url = data.next;
  }

  return genres;
}
