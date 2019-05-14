import React from "react";
import renderer from "react-test-renderer";
import MovieCardInfo from "./movie-card-info.jsx";

const featuredFilm = {
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  genre: `Sci-Fi`,
  year: `2019`
};

it(`Movie card ifo correctly renders`, () => {
  const tree = renderer
    .create(<MovieCardInfo
      featuredFilm={featuredFilm}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
