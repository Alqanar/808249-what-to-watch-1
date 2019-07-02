import * as React from "react";

import Sprite from "../sprite/sprite";
import Logo from "../logo/logo";
import Footer from "../footer/footer";


interface IProps {
  email: string;
  errorMessage: string;
  isErrorEmail: boolean;
  isErrorPass: boolean;
  onEmailInputChange: () => void;
  onMount?: () => void;
  onPassInputChange: () => void;
  onSignInButtonClick: () => Promise<void>;
  pass: string;
}

const inputProperties = [
  {
    error: `isErrorEmail`,
    onChange: `onEmailInputChange`,
    type: `email`,
    placeholder: `Email address`,
    name: `user-email`,
    value: `email`
  },
  {
    error: `isErrorPass`,
    onChange: `onPassInputChange`,
    type: `password`,
    placeholder: `Password`,
    name: `user-password`,
    value: `pass`
  }
];

class SignInPage extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);
  }

  public render(): React.ReactElement {
    const {
      errorMessage,
      onSignInButtonClick
    } = this.props;

    return (
      <>
        <Sprite />
        <div className="user-page">
          <header className="page-header user-page__head">
            <Logo
              hrefLink='/'
            />
            <h1 className="page-title user-page__title">Sign in</h1>
          </header>
          <div className="sign-in user-page__content">
            <form action="#" className="sign-in__form">
              {errorMessage ? this.renderErrorMessage() : ``}
              {this.renderFieldsForm()}
              <div className="sign-in__submit">
                <button
                  onClick={onSignInButtonClick}
                  className="sign-in__btn"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <Footer
            hrefLink='/'
          />
        </div>
      </>
    );
  }

  public componentDidMount(): void {
    const {onMount} = this.props;

    if (onMount) {
      onMount();
    }
  }

  private renderFieldsForm(): React.ReactElement {
    const props = this.props;

    const fieldsForm = inputProperties.map((field): React.ReactElement => (
      <div key={field.name} className={`sign-in__field ${props[field.error] ? `sign-in__field--error` : ``}`}>
        <input
          onChange={props[field.onChange]}
          className="sign-in__input"
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          id={field.name}
          value={props[field.value]}
        />
        <label className="sign-in__label visually-hidden" htmlFor={field.name}>{field.placeholder}</label>
      </div>
    ));

    return (
      <div className="sign-in__fields">
        {fieldsForm}
      </div>
    );
  }

  private renderErrorMessage(): React.ReactElement {
    const {errorMessage} = this.props;

    return (
      <div className="sign-in__message">
        <p>{errorMessage}</p>
      </div>
    );
  }
}


export default SignInPage;
