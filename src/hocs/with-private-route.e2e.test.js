import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";

import {withPrivateRoute} from "./with-private-route.tsx";
import history from "../history.ts";

Enzyme.configure({adapter: new Adapter()});


const MockComponent = () => (
  <div className="new-page">asd</div>
);

const MockComponentWrapped = withPrivateRoute(MockComponent);


describe(`withPrivateRoute works correctly`, () => {
  it(`if the autharisation true we see component page`, () => {
    const wrapper = mount(
      <Router history={history}>
        <MockComponentWrapped
          userId={123}
        />
      </Router>
    );

    const container = wrapper.find(`.new-page`);

    expect(container.html()).toBeTruthy();
  });

  it(`if the autharisation true we see component page`, () => {
    const wrapper = mount(
      <Router history={history}>
        <MockComponentWrapped
          userId={undefined}
        />
      </Router>
    );

    expect(wrapper.html()).toBeFalsy();

  });
});
