import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import MovieCardButtons from "./movie-card-buttons.tsx";


const testInitialState = {
  genre: `All genres`,
  films: []
};

it(`Movie card buttons correctly renders`, () => {
  const tree = renderer
    .create(
      <Provider store={createStore(() => testInitialState)}>
        <MovieCardButtons
          favorite={false}
          id="7"
        />
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
