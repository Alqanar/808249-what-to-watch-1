import transformFilmObject from "../../transformFilmObject.js";


const initialState = {
  genre: `All genres`,
  films: [],
  promotedFilm: null,
  favoriteFilms: []
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FAVORITE_FILMS: `SET_FAVORITE_FILMS`,
  SET_FAVORITE_STATUS: `SET_FAVORITE_STATUS`,
  SET_FILMS: `SET_FILMS`,
  SET_PROMOTED_FILM: `SET_PROMOTED_FILM`,
};

const ActionCreator = {
  setFavoriteFilms: (favoriteFilms) => ({
    type: ActionType.SET_FAVORITE_FILMS,
    payload: favoriteFilms
  }),

  setFavoriteStatus: (id, status) => ({
    type: ActionType.SET_FAVORITE_STATUS,
    payload: {id, status}
  }),

  setFilms: (films) => ({
    type: ActionType.SET_FILMS,
    payload: films
  }),

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre
  }),

  setPromotedFilm: (promotedFilm) => ({
    type: ActionType.SET_PROMOTED_FILM,
    payload: promotedFilm,
  })
};

const Operation = {
  loadFavoriteFilms: () => (dispatch, _, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.setFavoriteFilms(response.data.map(transformFilmObject)));
      });
  },

  loadFilms: () => (dispatch, _, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setFilms(response.data.map(transformFilmObject)));
      });
  },

  loadPromotedFilm: () => (dispatch, _, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.setPromotedFilm(transformFilmObject(response.data)));
      });
  },

  sendFavoriteStatus: (id, status) => (dispatch, _, api) => {
    return api.post(`/favorite/${id}/${status ? 1 : 0}`)
      .then(() => {
        dispatch(ActionCreator.setFavoriteStatus(id, status));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_GENRE:
      return {
        ...state,
        genre: action.payload
      };

    case ActionType.SET_FAVORITE_FILMS:
      return {
        ...state,
        favoriteFilms: action.payload
      };

    case ActionType.SET_FAVORITE_STATUS:
      let promotedFilm = state.promotedFilm;
      if (
        promotedFilm &&
        promotedFilm.id === action.payload.id
      ) {
        promotedFilm = {
          ...promotedFilm,
          favorite: action.payload.status
        };
      }
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
        }),
        promotedFilm
      };

    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload
      };

    case ActionType.SET_PROMOTED_FILM:
      return {
        ...state,
        promotedFilm: action.payload
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
