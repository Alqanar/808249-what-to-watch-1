import transformFilmObject from "../../transformFilmObject.js";


const initialState = {
  genre: `All genres`,
  films: []
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS: `SET_FILMS`
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
  loadFilms: () => (dispatch, _, api) => {
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
        genre: action.payload
      };

    case ActionType.SET_FILMS:
      return {
        ...state,
        films: action.payload
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
