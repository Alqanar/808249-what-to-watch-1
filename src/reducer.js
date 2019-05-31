import transformFilmObject from "./transformFilmObject.js";


const initialState = {
  genre: `All genres`,
  films: [],
  filteredFilms: [],
  isAuthorizationRequired: false,
  isAuthPage: false,
  user: {
    id: null,
    email: ``,
    name: ``,
    avatarUrl: ``
  }
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER: `SET_USER`,
  SET_AUTH_PAGE: `SET_AUTH_PAGE`
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
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  setUser: (userObject) => ({
    type: ActionType.SET_USER,
    payload: {
      id: userObject.id,
      email: userObject.email,
      name: userObject.name,
      avatarUrl: `https://es31-server.appspot.com${userObject.avatar_url}`
    }
  }),

  setAuthorizationPage: (status) => ({
    type: ActionType.SET_AUTH_PAGE,
    payload: status,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, _, {api}) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.setFilms(response.data.map(transformFilmObject)));
      });
  },
  requestAuthorization: (login, password) => (dispatch, _, {api}) => {
    return api.post(`/login`, {
      email: login,
      password
    })
    .then((response) => {
      dispatch(ActionCreator.setUser(response.data));
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

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthorizationRequired: false,
        isAuthPage: false
      };

    case ActionType.SET_AUTH_PAGE:
      return {
        ...state,
        isAuthPage: action.payload,
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
