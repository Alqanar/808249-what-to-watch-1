import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from "./app.jsx";
import {films} from "../../mocks/films.js";

const testInitialState = {
  genre: `All genres`,
  films,
  filteredFilms: films
};

it(`App correctly renders`, () => {
  const tree = renderer
    .create(
        <Provider store={createStore(() => testInitialState)}>
          <App />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
