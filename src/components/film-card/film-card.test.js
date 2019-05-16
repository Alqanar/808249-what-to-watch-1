import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";


const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  trailer: `https://youtu.be/TcMBFSGVi1c`
};

it(`Film card correctly renders`, () => {
  const tree = renderer
    .create(<FilmCard
      movie={film}
      key={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});