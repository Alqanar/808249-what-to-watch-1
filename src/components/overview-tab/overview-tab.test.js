import React from "react";
import renderer from "react-test-renderer";

import OverviewTab from "./overview-tab.tsx";


const filmMockData = {
  rating: 8.8,
  scoresCount: 441946,
  description: `After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.`,
  director: `Russo brothers`,
  starring: [`Robert Downey Jr.`, `Chris Hemsworth`, `Mark Ruffalo`]
};

it(`Overview tab is correctly renders`, () => {
  const tree = renderer
    .create(
      <OverviewTab
        film={filmMockData}
      />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
