import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from "./app.jsx";

const testInitialState = {
  genre: `All genres`,
  films: [],
  filteredFilms: []
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
