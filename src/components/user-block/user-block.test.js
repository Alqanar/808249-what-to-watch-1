import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import UserBlock from "./user-block.tsx";


describe(`User block correctly renders`, () => {
  it(`if isAuth = true renders avatar block`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <UserBlock
          avatarLink="img/avatar.jpg"
          isAuth={true}
        />
      </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if isAuth = false renders sign in link`, () => {
    const tree = renderer
      .create(<BrowserRouter>
        <UserBlock
          avatarLink=""
          isAuth={false}
        />
      </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
