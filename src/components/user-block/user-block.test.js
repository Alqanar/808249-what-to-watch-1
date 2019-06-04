import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";


describe(`User block correctly renders`, () => {
  it(`if isAuth = true renders avatar block`, () => {
    const tree = renderer
      .create(<UserBlock
        avatarLink="img/avatar.jpg"
        isAuth={true}
        moveToAuth={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if isAuth = false renders sign in link`, () => {
    const tree = renderer
      .create(<UserBlock
        avatarLink=""
        isAuth={false}
        moveToAuth={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
