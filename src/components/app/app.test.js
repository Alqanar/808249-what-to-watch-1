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

const testInitialState = {
  movie: {
    genre: `All genres`,
    films
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
              signIn={() => {}}
              avatarLink="img/avatar.jpg"
              userId={null}
              genresList={genres}
            />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
