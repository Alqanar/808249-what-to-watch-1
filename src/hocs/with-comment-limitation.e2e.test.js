import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withCommentLimitation from "./with-comment-limitation.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onTextareaChange
}) => (
  <form>
    <textarea className="textarea" onChange={onTextareaChange} />
  </form>
);

MockComponent.propTypes = {
  onTextareaChange: PropTypes.func.isRequired
};

const MockComponentWrapped = withCommentLimitation(MockComponent);

describe(`withCommentLimitation works correctly`, () => {
  it(`when text in the textarea change state change too`, () => {
    const textComment = `I didn't like this film. It's very boring and lengthy.`;
    const eventTextarea = {target: {value: textComment}};
    const wrapper = mount(<MockComponentWrapped
      onTextareaChange={() => {}}
    />);

    const fieldTextarea = wrapper.find(`.textarea`);

    fieldTextarea.simulate(`change`, eventTextarea);

    expect(wrapper.state().comment).toEqual(textComment);
  });
});
