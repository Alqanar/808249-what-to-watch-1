import React from "react";
import renderer from "react-test-renderer";

import MyListButton from "./my-list-button.tsx";


it(`My list button correctly renders`, () => {
    const tree = renderer
        .create(<MyListButton />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
