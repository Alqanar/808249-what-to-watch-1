import * as React from "react";
import {History} from "history";


interface IProps {
    onSignInButtonClick: (email: string, pass: string) => Promise<void>;
    history: History;
    onMount?: () => void;
}

interface IState {
    email: string;
    pass: string;
    isErrorEmail: boolean;
    isErrorPass: boolean;
}

function withAuthorizationState<T>(Component: React.ComponentType<T>): React.ComponentClass<IProps & T, IState> {

    class WithAuthorizationState extends React.PureComponent<IProps & T, IState> {
        public constructor(props) {
            super(props);

            this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
            this.handlePassInputChange = this.handlePassInputChange.bind(this);
            this.handleSignInButtonClick = this.handleSignInButtonClick.bind(this);

            this.state = {
                email: ``,
                pass: ``,
                isErrorEmail: false,
                isErrorPass: false
            };
        }

        public render(): React.ReactElement {
            const {email, pass, isErrorEmail, isErrorPass} = this.state;

            return <Component
                {...this.props}
                email={email}
                pass={pass}
                onEmailInputChange={this.handleEmailInputChange}
                onPassInputChange={this.handlePassInputChange}
                onSignInButtonClick={this.handleSignInButtonClick}
                isErrorEmail={isErrorEmail}
                isErrorPass={isErrorPass}
            />;
        }

        private handleEmailInputChange(event): void {
            this.setState({
                email: event.target.value,
                isErrorEmail: false
            });
        }

        private handlePassInputChange(event): void {
            this.setState({
                pass: event.target.value,
                isErrorPass: false
            });
        }

        private handleSignInButtonClick(event): void {
            const {email, pass} = this.state;
            const {onSignInButtonClick} = this.props;

            event.preventDefault();
            this.setState({
                isErrorEmail: false,
                isErrorPass: false
            });
            if (email && pass) {
                onSignInButtonClick(email, pass)
                    .then((): void => {
                        this.props.history.push(`/`);
                    });
            } else {
                this.setState({
                    isErrorEmail: Boolean(!email),
                    isErrorPass: Boolean(!pass)
                });
            }
        }
    }

    return WithAuthorizationState;
}

export default withAuthorizationState;
