import {
  ActionCreator,
  reducer,
} from "./reducer";

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


it(`Action creator for set genre returns correct action`, () => {
  expect(ActionCreator.setGenre(`Sci-Fi`)).toEqual({
    type: `SET_GENRE`,
    payload: `Sci-Fi`,
  });
});


describe(`Reducer works correctly`, () => {
  it(`Without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      genre: `All genres`,
      films: [],
      filteredFilms: []
    });
  });

  it(`On set genre films filtering film`, () => {
    expect(reducer({
      genre: `All genres`,
      films,
      filteredFilms: films
    }, {
      type: `SET_GENRE`,
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
      type: `SET_GENRE`,
      payload: `All genres`,
    })).toEqual({
      genre: `All genres`,
      films,
      filteredFilms: films
    });
  });
});
