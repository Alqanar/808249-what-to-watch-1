import React from "react";
import renderer from "react-test-renderer";

import MovieCardButtons from "./movie-card-buttons.tsx";


it(`Movie card buttons correctly renders`, () => {
  const tree = renderer
    .create(<MovieCardButtons />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
