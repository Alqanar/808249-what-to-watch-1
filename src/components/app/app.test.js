import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {BrowserRouter} from "react-router-dom";

import {App} from "./app.jsx";


const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`,
    trailer: `https://youtu.be/FPv3e2FZOgo`
  },
  {
    id: `1`,
    name: `The Professor and the Madman`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`,
    trailer: `https://youtu.be/ESYU-bkmxuI`
  },
  {
    id: `2`,
    name: `Five Feet Apart`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`,
    trailer: `https://youtu.be/XtgCqMZofqM`
  }
];

const testInitialState = {
  movie: {
    genre: `All genres`,
    films
  },
  // authorization: {
  //   isAuthorizationRequired: false
  // }
};


describe(`App correctly renders`, () => {
  it(`when isAuthorizationRequired = false renders Main Page`, () => {
    const tree = renderer
      .create(
          <Provider store={createStore(() => testInitialState)}>
            <BrowserRouter>
              <App
                // isAuthorizationRequired={false}
                signIn={() => {}}
                avatarLink="img/avatar.jpg"
                openedAuthPage={() => {}}
                // isAuthPage={false}
                userId={null}
              />
            </BrowserRouter>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when isAuthorizationRequired = true renders Sign In Page`, () => {
    const tree = renderer
      .create(
          <Provider store={createStore(() => testInitialState)}>
            <BrowserRouter>
              <App
                // isAuthorizationRequired={true}
                signIn={() => {}}
                avatarLink="img/avatar.jpg"
                openedAuthPage={() => {}}
                // isAuthPage={false}
                userId={null}
              />
            </BrowserRouter>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
