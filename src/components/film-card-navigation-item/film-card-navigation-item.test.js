import React from "react";
import renderer from "react-test-renderer";

import FilmCardNavigationItem from "./film-card-navigation-item.tsx";


it(`Film card navigation item correctly renders`, () => {
  const tree = renderer
    .create(<FilmCardNavigationItem
      name="Details"
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
