import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import UserBlock from "./user-block.tsx";
import history from "../../history.ts";


describe(`User block correctly renders`, () => {
  it(`if isAuth = true renders avatar block`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <UserBlock
            avatarLink="img/avatar.jpg"
            isAuth={true}
          />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if isAuth = false renders sign in link`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <UserBlock
            avatarLink=""
            isAuth={false}
          />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
