import React from "react";
import renderer from "react-test-renderer";

import {MoviesList} from "./movies-list.tsx";

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
    .create(<MoviesList
      films={films}
      useAllFilms={true}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
