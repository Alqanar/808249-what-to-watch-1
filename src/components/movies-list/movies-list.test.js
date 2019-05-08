import React from "react";
import renderer from "react-test-renderer";

import MoviesList from "./movies-list.jsx";

const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    link: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`
  },
  {
    id: `1`,
    name: `The Professor and the Madman`,
    link: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`
  },
  {
    id: `2`,
    name: `Five Feet Apart`,
    link: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`
  }
];

it(`Movie list correctly renders`, () => {
  const tree = renderer
    .create(<MoviesList
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
