import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withAuthorizationState from "./with-authorization-state.jsx";

Enzyme.configure({adapter: new Adapter()});


const MockComponent = ({
  email,
  pass,
  onEmailInputChange,
  onPassInputChange,
  onSignInButtonClick
}) => (
  <div>
    <input className="email-input" type="text" value={email} onChange={onEmailInputChange} />
    <input className="pass-input" type="text" value={pass} onChange={onPassInputChange} />
    <button className="button-signin" onClick={onSignInButtonClick} />
  </div>
);

MockComponent.propTypes = {
  email: PropTypes.string.isRequired,
  pass: PropTypes.string.isRequired,
  onEmailInputChange: PropTypes.func.isRequired,
  onPassInputChange: PropTypes.func.isRequired,
  onSignInButtonClick: PropTypes.func.isRequired
};

const MockComponentWrapped = withAuthorizationState(MockComponent);

const history = {
  push: jest.fn()
};

describe(`withAuthorizationState works correctly`, () => {
  it(`when click on the button callback is works`, () => {
    const handleButtonClick = jest.fn().mockReturnValue(Promise.resolve());
    const wrapper = mount(<MockComponentWrapped
      onSignInButtonClick={handleButtonClick}
      history={history}
    />);

    const buttonSignIn = wrapper.find(`.button-signin`);

    buttonSignIn.simulate(`click`, {preventDefault() {}});

    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`when input email change state change too`, () => {
    const handleButtonClick = jest.fn().mockReturnValue(Promise.resolve());
    const eventEmail = {target: {value: `spam@test.ru`}};
    const wrapper = mount(<MockComponentWrapped
      onSignInButtonClick={handleButtonClick}
      history={history}
    />);

    const emailInput = wrapper.find(`.email-input`);
    emailInput.simulate(`change`, eventEmail);

    expect(wrapper.state().email).toEqual(`spam@test.ru`);
  });

  it(`when input password change state change too`, () => {
    const handleButtonClick = jest.fn().mockReturnValue(Promise.resolve());
    const eventPass = {target: {value: `1234`}};
    const wrapper = mount(<MockComponentWrapped
      onSignInButtonClick={handleButtonClick}
      history={history}
    />);

    const passInput = wrapper.find(`.pass-input`);
    passInput.simulate(`change`, eventPass);

    expect(wrapper.state().pass).toEqual(`1234`);
  });

  it(`clicking on the button will transfer the email and pass`, () => {
    const handleButtonClick = jest.fn().mockReturnValue(Promise.resolve());
    const eventEmail = {target: {value: `spam@test.ru`}};
    const eventPass = {target: {value: `1234`}};
    const wrapper = mount(<MockComponentWrapped
      onSignInButtonClick={handleButtonClick}
      history={history}
    />);

    const emailInput = wrapper.find(`.email-input`);
    emailInput.simulate(`change`, eventEmail);
    const passInput = wrapper.find(`.pass-input`);
    passInput.simulate(`change`, eventPass);

    const buttonSignIn = wrapper.find(`.button-signin`);

    buttonSignIn.simulate(`click`, {preventDefault() {}});

    expect(handleButtonClick).toHaveBeenCalledWith(eventEmail.target.value, eventPass.target.value);
  });
});
