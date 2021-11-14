import movies from '../apis/movies';
import {
  IMAGE_PATH,
  FAMILY_GENRE_CODE,
  DOCUMENTARY_GENRE_CODE,
} from '../constants';
import {KEY} from '@env';

// Get Popular Movies
export const getPopularMovies = async () => {
  const res = await movies.get(`/movie/popular?api_key=${KEY}`);
  return res.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const res = await movies.get(
    `/discover/movie?api_key=${KEY}&with_genres=${FAMILY_GENRE_CODE}`,
  );
  return res.data.results;
};

// Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const res = await movies.get(
    `/movie/popular?api_key=${KEY}&with_genres=${DOCUMENTARY_GENRE_CODE}`,
  );
  return res.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await movies.get(`/movie/upcoming?api_key=${KEY}`);
  return res.data.results;
};

// Get Upcoming Movie Images
export const getUpcomingMovieImages = async () => {
  const movieList = await getUpcomingMovies();
  const imageList = [];
  movieList.forEach(movie => {
    const posterPath = movie.poster_path;
    const movieImg = `${IMAGE_PATH}${posterPath}`;
    imageList.push(movieImg);
  });
  return imageList;
};

// Get Popular Tv
export const getPopularTv = async () => {
  const res = await movies.get(`/tv/popular?api_key=${KEY}`);
  return res.data.results;
};

// Get Movie Detail
export const getMovie = async movieId => {
  const res = await movies.get(`/movie/${movieId}?api_key=${KEY}`);
  return res.data;
};

// Search for Movie or TV by Keyword
export const searchMovieTv = async (query, type) => {
  const res = await movies.get(`/search/${type}?api_key=${KEY}&query:${query}`);
  return res.data.results;
};
