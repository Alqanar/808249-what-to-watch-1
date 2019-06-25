import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Router} from "react-router-dom";

import {App} from "./app.tsx";
import history from "../../history.ts";


const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`,
    trailer: `https://youtu.be/FPv3e2FZOgo`
  },
  {
    id: `1`,
    name: `The Professor and the Madman`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`,
    trailer: `https://youtu.be/ESYU-bkmxuI`
  },
  {
    id: `2`,
    name: `Five Feet Apart`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`,
    trailer: `https://youtu.be/XtgCqMZofqM`
  }
];

const promotedFilm = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  posterImage: `img/the-grand-budapest-hotel-poster.jpg`,
  posterLink: `img/the-grand-budapest-hotel.jpg`,
  coverLink: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#e1b0b2`,
  videoLink: `https://some-link`,
  trailer: `https://some-link`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustaves friend and protege.`,
  rating: 8.9,
  scoresCount: 240,
  director: `Wes Andreson`,
  famousActors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  duration: 99,
  genre: [`Comedy`],
  released: 2014,
  favorite: false,
};

const testInitialState = {
  movie: {
    genre: `All genres`,
    films,
    promotedFilm
  },
  authorization: {
    user: {
      id: `1`
    },
    errorMessage: ``
  }
};

const genres = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`
];


describe(`App`, () => {
  it(`is correctly renders`, () => {
    const tree = renderer
      .create(
        <Provider store={createStore(() => testInitialState)}>
          <Router history={history}>
            <App
              avatarLink="img/avatar.jpg"
              genresList={genres}
              promotedFilm={promotedFilm}
              signIn={() => {}}
              userId={null}
            />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
