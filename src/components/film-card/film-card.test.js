import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";


const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  link: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`
};

it(`Film card correctly renders`, () => {
  const tree = renderer
    .create(<FilmCard
      movie={film}
      key={0}
      isActive={false}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
