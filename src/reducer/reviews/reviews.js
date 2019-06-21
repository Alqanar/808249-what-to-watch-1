const initialState = {
  comments: {}
};

const ActionType = {
  SET_REVIEWS: `SET_REVIEWS`
};

const ActionCreator = {

  setReviews: (filmId, reviews) => {
    const sortedReviews = reviews.sort((reviewA, reviewB) => {
      return new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime();
    });
    return {
      type: ActionType.SET_REVIEWS,
      payload: {
        filmId,
        reviews: sortedReviews
      }
    };
  }
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
