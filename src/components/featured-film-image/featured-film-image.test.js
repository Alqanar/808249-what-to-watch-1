import React from "react";
import renderer from "react-test-renderer";

import FeaturedFilmImage from "./featured-film-image.tsx";


const featuredFilmMock = {
  name: `Avengers: Endgame`,
  coverLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  genre: [`Sci-Fi`],
  released: `2019`
};

it(`Image of the featured film correctly renders`, () => {
  const tree = renderer
    .create(
      <FeaturedFilmImage
        film={featuredFilmMock}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
