import React from "react";
import renderer from "react-test-renderer";

import MovieMasterData from "./movie-master-data.tsx";

it(`Movie master data correctly renders`, () => {
  const tree = renderer
    .create(
        <MovieMasterData
          name={`Avengers: Endgame`}
          genre={[`Sci-Fi`]}
          year={`2019`}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
