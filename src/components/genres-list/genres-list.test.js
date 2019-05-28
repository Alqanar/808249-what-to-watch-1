import React from "react";
import renderer from "react-test-renderer";

import {GenresList} from "./genres-list.jsx";


export const GENRES = [
  {
    label: `All genres`,
    filmGenre: `All genres`
  },
  {
    label: `Comedies`,
    filmGenre: `Comedy`
  },
  {
    label: `Crime`,
    filmGenre: `Crime`
  },
  {
    label: `Documentary`,
    filmGenre: `Documentary`
  },
  {
    label: `Dramas`,
    filmGenre: `Drama`
  },
  {
    label: `Horror`,
    filmGenre: `Horror`
  },
  {
    label: `Kids & Family`,
    filmGenre: `Kids & Family`
  },
  {
    label: `Romance`,
    filmGenre: `Romance`
  },
  {
    label: `Sci-Fi`,
    filmGenre: `Fantasy`
  },
  {
    label: `Thrillers`,
    filmGenre: `Thriller`
  }
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
