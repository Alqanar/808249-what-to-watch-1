import React from "react";
import renderer from "react-test-renderer";

import {GenresList} from "./genres-list.jsx";


export const GENRES = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`
];

it(`Genres list correctly renders`, () => {
  const tree = renderer
    .create(<GenresList
      genres={GENRES}
      activeGenre="Dramas"
      onSetGenre={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
