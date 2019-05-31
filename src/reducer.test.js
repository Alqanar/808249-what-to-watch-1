import MockAdapter from "axios-mock-adapter";
import api from "./api.js";
import transformFilmObject from "./transformFilmObject.js";
import {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
} from "./reducer.js";


const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`,
    trailer: `https://youtu.be/FPv3e2FZOgo`,
    genre: [`Dramas`, `Romance`]
  },
  {
    id: `1`,
    name: `The Professor and the Madman`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`,
    trailer: `https://youtu.be/ESYU-bkmxuI`,
    genre: [`Thrillers`, `Dramas`, `Documentary`]
  },
  {
    id: `2`,
    name: `Five Feet Apart`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`,
    trailer: `https://youtu.be/XtgCqMZofqM`,
    genre: [`Dramas`, `Romance`]
  }
];

const filmFromServer = {
  'background_color': `#A39E81`,
  'background_image': `https://es31-server.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg`,
  'description': `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
  'director': `Jemaine Clement`,
  'genre': `Comedy`,
  'id': 1,
  'is_favorite': false,
  'name': `What We Do in the Shadows`,
  'poster_image': `https://es31-server.appspot.com/wtw/static/film/poster/What-We-Do-in-the-Shadows.jpg`,
  'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
  'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  'rating': 8.4,
  'released': 2019,
  'run_time': 30,
  'scores_count': 6173,
  'starring': [`Kayvan Novak`, `Matt Berry`, `Natasia Demetriou`],
  'video_link': `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
};

const userData = {
  'avatar_url': `/wtw/static/avatar/9.jpg`,
  'email': `example@test.ru`,
  'id': 1,
  'name': `example`
};


it(`Action creator for set genre returns correct action`, () => {
  expect(ActionCreator.setGenre(`Sci-Fi`)).toEqual({
    type: ActionType.SET_GENRE,
    payload: `Sci-Fi`,
  });
});


describe(`Reducer works correctly`, () => {
  it(`Without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });

  it(`On set genre films filtering film`, () => {
    expect(reducer({
      genre: `All genres`,
      films,
      filteredFilms: films
    }, {
      type: ActionType.SET_GENRE,
      payload: `Thrillers`,
    })).toEqual({
      genre: `Thrillers`,
      films,
      filteredFilms: [{
        id: `1`,
        name: `The Professor and the Madman`,
        posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`,
        trailer: `https://youtu.be/ESYU-bkmxuI`,
        genre: [`Thrillers`, `Dramas`, `Documentary`]
      }]
    });

    expect(reducer({
      genre: `All genres`,
      films,
      filteredFilms: films
    }, {
      type: ActionType.SET_GENRE,
      payload: `All genres`,
    })).toEqual({
      genre: `All genres`,
      films,
      filteredFilms: films
    });
  });

  it(`when the status changes, the isAuthorizationRequired state changes`, () => {
    expect(reducer({
      isAuthorizationRequired: false
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true
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

  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [filmFromServer]);

    return filmsLoader(dispatch, undefined, {api})
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FILMS,
          payload: [transformFilmObject(filmFromServer)],
        });
      });
  });

  it(`Should make a correct API sends to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const requestAuthorization = Operation.requestAuthorization();

    apiMock
      .onPost(`/login`)
      .reply(200, userData);

    return requestAuthorization(dispatch, undefined, {api})
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
