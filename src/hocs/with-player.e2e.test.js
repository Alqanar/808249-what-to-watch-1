import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withPlayer from "./with-player.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onSwitchPausePlay
}) => (
  <div>
    <button className="button-control" onClick={onSwitchPausePlay} />
  </div>
);

MockComponent.propTypes = {
  onSwitchPausePlay: PropTypes.func.isRequired
};

const MockComponentWrapped = withPlayer(MockComponent);

describe(`withPlayer works correctly`, () => {
  it(`when clicking on the button of control the state changing`, () => {
    const wrapper = mount(<MockComponentWrapped
      onClick={() => {}}
    />);

    const state = wrapper.state().isFilmPlaying;

    const buttonFilmControl = wrapper.find(`.button-control`);

    buttonFilmControl.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().isFilmPlaying).toEqual(!state);
  });
});
