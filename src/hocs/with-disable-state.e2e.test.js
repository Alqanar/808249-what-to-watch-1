import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withDisableState from "./with-disable-state.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onFormSubmit,
  onTextareaChange
}) => (
  <form>
    <button className="button-submit" onClick={onFormSubmit} />
    <textarea className="textarea" onChange={onTextareaChange} />
  </form>
);

MockComponent.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onTextareaChange: PropTypes.func.isRequired
};

const MockComponentWrapped = withDisableState(MockComponent);

describe(`withDisableState works correctly`, () => {
  it(`when text in the textarea change state change too`, () => {
    const textComment = `I didn't like this film. It's very boring and lengthy.`;
    const eventTextarea = {target: {value: textComment}};
    const wrapper = mount(<MockComponentWrapped
      onFormSubmit={() => {}}
      onTextareaChange={() => {}}
    />);

    const fieldTextarea = wrapper.find(`.textarea`);

    fieldTextarea.simulate(`change`, eventTextarea);

    expect(wrapper.state().comment).toEqual(textComment);
  });

  it(`when clicking on the submit button the state changing`, () => {
    const wrapper = mount(<MockComponentWrapped
      onFormSubmit={() => {}}
      onTextareaChange={() => {}}
    />);

    const state = wrapper.state().isDisable;

    const buttonSubmit = wrapper.find(`.button-submit`);

    buttonSubmit.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().isDisable).toEqual(!state);
  });
});
