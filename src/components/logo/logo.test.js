import React from "react";
import renderer from "react-test-renderer";

import Logo from "./logo.jsx";


it(`Logo correctly renders`, () => {
  const tree = renderer
    .create(<Logo />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
