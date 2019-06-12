import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {BrowserRouter} from "react-router-dom";

import MainPage from "./main-page.tsx";
import {
  featuredFilmMock,
  genresMock,
  moviesListMock
} from "./test-mock-data.js";


const testInitialState = {
  movie: {
    genre: `All genres`,
    films: moviesListMock
  }
};

it(`Main page correctly renders`, () => {
  const tree = renderer
    .create(
      <Provider store={createStore(() => testInitialState)}>
        <BrowserRouter>
          <MainPage
            avatarLink='img/avatar.jpg'
            featuredFilm={featuredFilmMock}
            genres={genresMock}
            isAuth={false}
          />
        </BrowserRouter>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
