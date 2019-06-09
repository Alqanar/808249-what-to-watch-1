import * as React from "react";
import { History } from "history";


const withAuthorizationState = (Component) => {
  interface IProps {
    onSignInButtonClick: (email: string, pass: string) => Promise<void>,
    history: History
  };

  interface IState {
    email: string,
    pass: string,
    isErrorEmail: boolean,
    isErrorPass: boolean
  }

  class WithAuthorizationState extends React.PureComponent<IProps, IState> {
    constructor(props) {
      super(props);

      this._handleEmailInputChange = this._handleEmailInputChange.bind(this);
      this._handlePassInputChange = this._handlePassInputChange.bind(this);
      this._handleSignInButtonClick = this._handleSignInButtonClick.bind(this);

      this.state = {
        email: ``,
        pass: ``,
        isErrorEmail: false,
        isErrorPass: false
      };
    }

    render() {
      const { email, pass, isErrorEmail, isErrorPass } = this.state;

      return <Component
        {...this.props}
        email={email}
        pass={pass}
        onEmailInputChange={this._handleEmailInputChange}
        onPassInputChange={this._handlePassInputChange}
        onSignInButtonClick={this._handleSignInButtonClick}
        isErrorEmail={isErrorEmail}
        isErrorPass={isErrorPass}
      />;
    }

    _handleEmailInputChange(event) {
      this.setState({
        email: event.target.value,
        isErrorEmail: false
      });
    }

    _handlePassInputChange(event) {
      this.setState({
        pass: event.target.value,
        isErrorPass: false
      });
    }

    _handleSignInButtonClick(event) {
      const { email, pass } = this.state;
      const { onSignInButtonClick } = this.props;

      event.preventDefault();
      this.setState({
        isErrorEmail: false,
        isErrorPass: false
      });
      if (email && pass) {
        onSignInButtonClick(email, pass)
          .then(() => this.props.history.push(`/`));
      } else {
        this.setState({
          isErrorEmail: Boolean(!email),
          isErrorPass: Boolean(!pass)
        });
      }
    }
  }

  return WithAuthorizationState;
};

export default withAuthorizationState;
