import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import SignInPage from "./sign-in-page.tsx";
import history from "../../history.ts";


it(`Sign In page correctly renders`, () => {
  const tree = renderer
    .create(
      <Router history={history}>
        <SignInPage
          email=""
          pass=""
          onEmailInputChange={() => {}}
          onPassInputChange={() => {}}
          onSignInButtonClick={() => {}}
          isErrorEmail={false}
          isErrorPass={false}
        />
      </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
