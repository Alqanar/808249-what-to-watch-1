import * as React from "react";
import {Subtract} from "utility-types";


interface IState {
  isPlayerOpened: boolean;
}

interface IInjectedProps {
  isPlayerOpened: boolean;
  onPlayButtonClick: () => void;
  onExitButtonClick: () => void;
}

// eslint-disable-next-line
function withPlayerPopup(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithPlayerPopup extends React.PureComponent<T, IState> {
    public constructor(props) {
      super(props);

      this.handleSwitchOpenedState = this.handleSwitchOpenedState.bind(this);

      this.state = {
        isPlayerOpened: false
      };
    }

    public render(): React.ReactElement {
      const {isPlayerOpened} = this.state;

      return <Component
        {...this.props}
        isPlayerOpened={isPlayerOpened}
        onPlayButtonClick={this.handleSwitchOpenedState}
        onExitButtonClick={this.handleSwitchOpenedState}
      />;
    }

    private handleSwitchOpenedState(event): void {
      const {isPlayerOpened} = this.state;

      event.preventDefault();
      this.setState({
        isPlayerOpened: !isPlayerOpened
      });
    }

  }
  return WithPlayerPopup;
}

export default withPlayerPopup;
