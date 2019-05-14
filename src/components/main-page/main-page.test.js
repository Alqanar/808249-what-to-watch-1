import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

import {
  featuredFilmMock,
  genresMock,
  moviesListMock
} from "./test-mock-data.js";

it(`Main page correctly renders`, () => {
  const tree = renderer
    .create(<MainPage
      avatarLink='img/avatar.jpg'
      featuredFilm={featuredFilmMock}
      genres={genresMock}
      moviesList={moviesListMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
