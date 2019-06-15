import React from "react";
import renderer from "react-test-renderer";

import ShakyWrapper from "./shaky-wrapper.tsx";


describe(`wrapper correctly renders`, () => {
  it(`when needVanish passed renders without wrapper`, () => {
    const tree = renderer
      .create(
        <ShakyWrapper needVanish>
          <p>Hello, world!</p>
        </ShakyWrapper>

      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when needVanish not passed renders div wrapper`, () => {
    const tree = renderer
      .create(
        <ShakyWrapper>
          <p>Hello, world!</p>
        </ShakyWrapper>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
