const initialState = {
  genre: `All genres`,
  films: [],
  filteredFilms: []
};

const setFilterFilms = (genre, films) => {
  if (genre === `All genres`) {
    return [...films];
  }
  return films.filter((film) =>
    film.genre.some((filmGenre) =>
      filmGenre === genre));
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: `SET_GENRE`,
    payload: genre
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SET_GENRE`:
      return {
        ...state,
        genre: action.payload,
        filteredFilms: setFilterFilms(action.payload, state.films)
      };
    default:
      return state;
  }
};

export {
  initialState,
  ActionCreator,
  reducer
};
