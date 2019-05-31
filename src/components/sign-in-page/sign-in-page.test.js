import React from "react";
import renderer from "react-test-renderer";

import SignInPage from "./sign-in-page.jsx";


it(`Sign In page correctly renders`, () => {
  const tree = renderer
    .create(<SignInPage
      email=""
      pass=""
      onEmailInputChange={() => {}}
      onPassInputChange={() => {}}
      onSignInButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
