import React from "react";
import renderer from "react-test-renderer";

import FilmCard from "./film-card.tsx";


const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  trailer: `https://youtu.be/TcMBFSGVi1c`
};

describe(`Film card correctly renders`, () => {
  it(`when useAllFilms true`, () => {
    const tree = renderer
      .create(<FilmCard
        movie={film}
        key={0}
        useAllFilms={true}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when useAllFilms false`, () => {
    const tree = renderer
      .create(<FilmCard
        movie={film}
        key={0}
        useAllFilms={false}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
