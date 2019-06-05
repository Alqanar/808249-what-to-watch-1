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
  // it(`require Authorization returns correct action`, () => {
  //   expect(ActionCreator.requireAuthorization(true)).toEqual({
  //     type: ActionType.REQUIRED_AUTHORIZATION,
  //     payload: true,
  //   });
  // });

  // it(`set Authorization Page returns correct action`, () => {
  //   expect(ActionCreator.setAuthorizationPage(true)).toEqual({
  //     type: ActionType.SET_AUTH_PAGE,
  //     payload: true,
  //   });
  // });

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
      // isAuthorizationRequired: false,
      // isAuthPage: false,
      user: {
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``
      }
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
      isAuthPage: false,
      isAuthorizationRequired: false,
      user: {
        id: 3,
        email: `example@test.ru`,
        name: `example`,
        avatarUrl: `/wtw/static/avatar/9.jpg`
      }
    });
  });

  // it(`when the status changes, the isAuthorizationRequired state changes`, () => {
  //   expect(reducer({
  //     isAuthorizationRequired: false
  //   }, {
  //     type: ActionType.REQUIRED_AUTHORIZATION,
  //     payload: true,
  //   })).toEqual({
  //     isAuthorizationRequired: true
  //   });
  // });

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
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_USER,
          payload: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            avatarUrl: `https://es31-server.appspot.com${userData.avatar_url}`},
        });
      });
  });
});
