import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import MainPage from "./main-page.jsx";
import {
  featuredFilmMock,
  genresMock,
  moviesListMock
} from "./test-mock-data.js";


const testInitialState = {
  genre: `All genres`,
  films: moviesListMock,
  filteredFilms: moviesListMock
};

it(`Main page correctly renders`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(() => testInitialState)}>
          <MainPage
            avatarLink='img/avatar.jpg'
            featuredFilm={featuredFilmMock}
            genres={genresMock}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
