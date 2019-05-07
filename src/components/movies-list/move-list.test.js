import React from "react";
import renderer from "react-test-renderer";

import MovieList from "./movie-list.jsx";

const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    imageLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`
  },
  {
    id: `1`,
    name: `The Professor and the Madman`,
    imageLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`
  },
  {
    id: `2`,
    name: `Five Feet Apart`,
    imageLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`
  }
];

it(`Movie list correctly renders`, () => {
  const tree = renderer
    .create(<MovieList
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
