import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";

import {
  ActionCreator,
  ActionType,
  reducer,
  Operation
} from "./reviews.js";


const reviewsMockData = [
  {
    id: 2,
    user: {
      id: 8,
      name: `Lika Forester`,
    },
    rating: 10,
    comment: `I laughed, cried and was speechless. 3 hours well used. It was a perfect. I will watch it again and again and again. 10 points well deserved!!!`,
    date: `2019-05-13T15:23:56.569Z`
  },
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  }
];

const reviewPostMockData = {
  rating: 3,
  comment: `It was very interesting`
};

const filmId = `1`;

it(`Action creator for set reviews returns correct action`, () => {
  expect(ActionCreator.setReviews(filmId, reviewsMockData)).toEqual({
    type: ActionType.SET_REVIEWS,
    payload: {filmId, reviews: reviewsMockData}
  });
});


describe(`Reducer works correctly`, () => {
  it(`Without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      comments: {}
    });
  });

  it(`reviews coming from the server is recorded in the state`, () => {
    expect(reducer({
      comments: {}
    }, {
      type: ActionType.SET_REVIEWS,
      payload: {
        filmId: `1`,
        reviews: {reviewsMockData}
      },
    })).toEqual({
      comments: {
        '1': {reviewsMockData}
      }
    });
  });

  it(`Should make a correct API call to /comments/:id`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const reviewsLoader = Operation.loadReviews(filmId);

    apiMock
      .onGet(`/comments/${filmId}`)
      .reply(200, reviewsMockData);

    return reviewsLoader(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEWS,
          payload: {filmId, reviews: reviewsMockData}
        });
      });
  });

  it(`Should make a correct API sends to /comments/:id/review`, function (done) {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    apiMock
      .onPost(`/comments/${filmId}`)
      .reply(200, reviewPostMockData);

    const reviewSender = Operation.sendReview(filmId, reviewPostMockData);

    reviewSender(undefined, undefined, api).then(() => {
      expect(apiMock.history.post[0].data).toBe(JSON.stringify({rating: 3, comment: `It was very interesting`}));
      done();
    });
  });
});
