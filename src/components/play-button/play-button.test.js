import React from "react";
import renderer from "react-test-renderer";

import PlayButton from "./play-button.tsx";


it(`Play button correctly renders`, () => {
    const tree = renderer
        .create(<PlayButton />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
