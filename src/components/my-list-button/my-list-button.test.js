import React from "react";
import renderer from "react-test-renderer";

import {MyListButton} from "./my-list-button.tsx";


it(`My list button correctly renders`, () => {
  const tree = renderer
    .create(
      <MyListButton
        favorite={false}
        id="7"
        isDisable={false}
        onDisableChange={() => {}}
        onSendFavoriteStatus={() => {}}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
