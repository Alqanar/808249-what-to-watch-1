import React from "react";
import renderer from "react-test-renderer";

import Footer from "./footer.tsx";

it(`Footer correctly renders`, () => {
  const tree = renderer
    .create(<Footer />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

