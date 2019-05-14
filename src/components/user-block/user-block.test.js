import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";


it(`User block correctly renders`, () => {
  const tree = renderer
    .create(<UserBlock
      avatarLink='img/avatar.jpg'
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
