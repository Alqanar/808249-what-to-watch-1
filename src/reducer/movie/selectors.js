import {createSelector} from "reselect";


const getGenre = (state) => (
  state.movie.genre
);

const getFilms = (state) => (
  state.movie.films
);

export const getFilterFilms = createSelector(
  getGenre,

  getFilms,

  (selectedGenre, filmsList) => {
    if (selectedGenre === `All genres`) {
      return filmsList;
    }
    return filmsList.filter((film) =>
      film.genre.some((filmGenre) =>
        filmGenre === selectedGenre));
  }
);

export const getGenresList = createSelector(
  getFilms,

  (filmsList) => {
    return [`All genres`, ...new Set(filmsList.reduce(function (acc, film) {
      return [...acc, ...film.genre];
    }, []))];
  }
);
