import React from "react";
import renderer from "react-test-renderer";

import DetailsTab from "./details-tab.tsx";


const filmMockData = {
  director: `Russo brothers`,
  famousActors: [`Robert Downey Jr.`, `Chris Hemsworth`, `Mark Ruffalo`],
  duration: 181,
  genre: [`Action`, `Adventure`, `Sci-Fi`],
  released: 2019
};

it(`Details tab is correctly renders`, () => {
  const tree = renderer
    .create(
      <DetailsTab
        film={filmMockData}
      />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
