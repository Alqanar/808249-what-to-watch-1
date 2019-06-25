import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withDisableState from "./with-disable-state.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onDisableChange
}) => (
  <form>
    <button className="button" onClick={onDisableChange} />
  </form>
);

MockComponent.propTypes = {
  onDisableChange: PropTypes.func.isRequired
};

const MockComponentWrapped = withDisableState(MockComponent);

describe(`withDisableState works correctly`, () => {
  it(`when clicking on the button the state changing`, () => {
    const wrapper = mount(<MockComponentWrapped
      onDisableChange={() => {}}
    />);

    const state = wrapper.state().isDisable;

    const button = wrapper.find(`.button`);

    button.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().isDisable).toEqual(!state);
  });
});
