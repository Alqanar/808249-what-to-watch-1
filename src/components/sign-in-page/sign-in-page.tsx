import * as React from "react";

import Sprite from "../sprite/sprite";
import Logo from "../logo/logo";
import Footer from "../footer/footer";


interface IProps {
  email: string,
  pass: string,
  onEmailInputChange: () => void,
  onPassInputChange: () => void,
  onSignInButtonClick: () => Promise<void>,
  isErrorEmail: boolean,
  isErrorPass: boolean
};

const SignInPage: React.FC<IProps> = (props) => {
  const {
    email,
    pass,
    onEmailInputChange,
    onPassInputChange,
    onSignInButtonClick,
    isErrorEmail,
    isErrorPass
  } = props;

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
            <div className="sign-in__fields">
              <div className={`sign-in__field ${isErrorEmail ? `sign-in__field--error` : ``}`}>
                <input
                  onChange={onEmailInputChange}
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  value={email}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={`sign-in__field ${isErrorPass ? `sign-in__field--error` : ``}`}>
                <input
                  onChange={onPassInputChange}
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  value={pass}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
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
};


export default SignInPage;
