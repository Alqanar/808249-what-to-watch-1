import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {MoviesList} from "./movies-list.tsx";
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

it(`Movie list correctly renders`, () => {
  const tree = renderer
    .create(
      <Router history={history}>
        <MoviesList
          films={films}
          useAllFilms={true}
        />
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
