const initialState = {
  comments: {}
};

const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`
};

const ActionCreator = {

  setReviews: (filmId, reviews) => ({
    type: ActionType.SET_REVIEWS,
    payload: {
      filmId,
      reviews
    }
  })
};

const Operation = {
  loadReviews: (filmId) => (dispatch, _, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.setReviews(filmId, response.data));
      });
  },
  sendReview: (filmId, {rating, comment}) => (_, __, api) => {
    return api.post(`/comments/${filmId}`, {
      rating,
      comment
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_REVIEWS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.filmId]: action.payload.reviews
        }
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
