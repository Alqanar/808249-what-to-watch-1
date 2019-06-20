import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withPlayerPopup from "./with-player-popup.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onPlayButtonClick,
  onExitButtonClick
}) => (
  <div>
    <button className="button-play" onClick={onPlayButtonClick} />
    <button className="button-exit" onClick={onExitButtonClick} />
  </div>
);

MockComponent.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired
};

const MockComponentWrapped = withPlayerPopup(MockComponent);

describe(`withPlayerPopup works correctly`, () => {
  it(`when clicking on the button of play the state changing`, () => {
    const wrapper = mount(<MockComponentWrapped
      onClick={() => {}}
    />);

    const state = wrapper.state().isPlayerOpened;

    const buttonPlayCard = wrapper.find(`.button-play`);

    buttonPlayCard.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().isPlayerOpened).toEqual(!state);
  });

  it(`when clicking on the button of exit the state changing`, () => {
    const wrapper = mount(<MockComponentWrapped
      onClick={() => {}}
    />);

    const state = wrapper.state().isPlayerOpened;

    const buttonExit = wrapper.find(`.button-exit`);

    buttonExit.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().isPlayerOpened).toEqual(!state);
  });
});
