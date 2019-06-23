import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {Router} from "react-router-dom";

import history from "../../history.ts";
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
  },
  authorization: {
    user: {
      id: `1`
    }
  }
};

it(`Main page correctly renders`, () => {
  const tree = renderer
    .create(
      <Provider store={createStore(() => testInitialState)}>
        <Router history={history}>
          <MainPage
            avatarLink='img/avatar.jpg'
            featuredFilm={featuredFilmMock}
            genres={genresMock}
            isAuth={false}
          />
        </Router>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
