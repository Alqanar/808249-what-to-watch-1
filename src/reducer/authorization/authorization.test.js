import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";

import {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
} from "./authorization.js";


const userData = {
  'avatar_url': `/wtw/static/avatar/9.jpg`,
  'email': `example@test.ru`,
  'id': 1,
  'name': `example`
};


describe(`Action creator for`, () => {

  it(`set user returns correct action`, () => {
    expect(ActionCreator.setUser({
      'id': 3,
      'email': `example@test.ru`,
      'name': `example`,
      'avatar_url': `/wtw/static/avatar/9.jpg`
    })).toEqual({
      type: ActionType.SET_USER,
      payload: {
        id: 3,
        email: `example@test.ru`,
        name: `example`,
        avatarUrl: `https://es31-server.appspot.com/wtw/static/avatar/9.jpg`
      }
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      user: {
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``
      },
      needAuth: false,
      errorMessage: ``
    });
  });

  it(`user data coming from the server is recorded in the state`, () => {
    expect(reducer({
      user: {
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``
      }
    }, {
      type: ActionType.SET_USER,
      payload: {
        id: 3,
        email: `example@test.ru`,
        name: `example`,
        avatarUrl: `/wtw/static/avatar/9.jpg`
      },
    })).toEqual({
      user: {
        id: 3,
        email: `example@test.ru`,
        name: `example`,
        avatarUrl: `/wtw/static/avatar/9.jpg`
      }
    });
  });

  it(`flag that comes from callback is recorded in the state`, () => {
    expect(reducer({
      needAuth: false
    }, {
      type: ActionType.SET_NEED_AUTH,
      payload: true,
    })).toEqual({
      needAuth: true
    });
  });

  it(`when use reset action comes back initial state`, () => {
    expect(reducer({
      user: {
        id: 5,
        email: `example@test.ru`,
        name: `example`,
        avatarUrl: `/wtw/static/avatar/9.jpg`
      },
      needAuth: false,
      errorMessage: ``
    }, {
      type: ActionType.RESET
    })).toEqual({
      user: {
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``
      },
      needAuth: false,
      errorMessage: ``
    });
  });

  it(`Should make a correct API sends to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const requestAuthorization = Operation.requestAuthorization();

    apiMock
      .onPost(`/login`)
      .reply(200, userData);

    return requestAuthorization(dispatch, undefined, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_ERROR_MESSAGE,
          payload: ``
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            avatarUrl: `https://es31-server.appspot.com${userData.avatar_url}`
          }
        });
      });
  });

  it(`invalidate user reset current user state`, function () {
    const dispatch = jest.fn();
    const invalidateUser = Operation.invalidateUser();

    invalidateUser(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.RESET
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.SET_NEED_AUTH,
      payload: true
    });
  });

  it(`error that comes from callback is recorded in the state`, () => {
    expect(reducer({
      errorMessage: ``
    }, {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Please enter a valid email address`,
    })).toEqual({
      errorMessage: `Please enter a valid email address`
    });
  });
});
