import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const film = {
  name: `Avengers: Endgame`,
  link: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`
};

it(`Film card correctly renders`, () => {
  const tree = renderer
    .create(<FilmCard
      movie={film}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
