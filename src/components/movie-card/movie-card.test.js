import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";


const featuredFilm = {
  name: `Avengers: Endgame`,
  coverLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  genre: `Sci-Fi`,
  year: `2019`
};

it(`Movie card correctly renders`, () => {
  const tree = renderer
    .create(<MovieCard
      avatarLink='img/avatar.jpg'
      featuredFilm={featuredFilm}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
