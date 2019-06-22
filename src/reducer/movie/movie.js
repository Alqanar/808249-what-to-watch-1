import transformFilmObject from "../../transformFilmObject.js";


const initialState = {
  genre: `All genres`,
  films: []
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`
};

const ActionCreator = {

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload: films,
  }),

  setFavoriteStatus: (id, status) => ({
    type: ActionType.SET_FAVORITE_STATUS,
    payload: {id, status}
  })
};

const Operation = {
  loadFilms: () => (dispatch, _, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setFilms(response.data.map(transformFilmObject)));
      });
  },
  sendFavoriteStatus: (id, status) => (dispatch, _, api) => {
    return api.post(`/favorite/${id}/${status ? 1 : 0}`)
      .then(() => {
        dispatch(ActionCreator.setFavoriteStatus(id, status));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload
      };

    case ActionType.SET_FAVORITE_STATUS:
      return {
        ...state,
        films: state.films.map((film) => {
          if (film.id === action.payload.id) {
            return {
              ...film,
              favorite: action.payload.status
            };
          }
          return film;
        })
      };

    default:
      return state;
  }
};

export {
  ActionCreator,
  ActionType,
  reducer,
  Operation
};
