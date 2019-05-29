import transformFilmObject from "./transformFilmObject.js";


const initialState = {
  genre: `All genres`,
  films: [],
  filteredFilms: []
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`
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
    type: ActionType.SET_GENRE,
    payload: genre
  }),
  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload: films,
  })
};

const Operation = {
  loadFilms: () => (dispatch, _, {api}) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setFilms(response.data.map(transformFilmObject)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload,
        filteredFilms: setFilterFilms(action.payload, state.films)
      };
    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload,
        filteredFilms: setFilterFilms(state.genre, action.payload)
      };
    default:
      return state;
  }
};

export {
  initialState,
  ActionCreator,
  ActionType,
  reducer,
  Operation
};
