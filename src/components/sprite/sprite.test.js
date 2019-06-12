import React from "react";
import renderer from "react-test-renderer";

import Sprite from "./sprite.tsx";


it(`Sprite correctly renders`, () => {
    const tree = renderer
        .create(<Sprite />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
