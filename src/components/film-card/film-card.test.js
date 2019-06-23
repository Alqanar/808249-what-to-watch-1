import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import FilmCard from "./film-card.tsx";
import history from "../../history.ts";


const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  trailer: `https://youtu.be/TcMBFSGVi1c`
};

describe(`Film card`, () => {
  it(`correctly renders`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <FilmCard
            film={film}
            key={0}
          />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
