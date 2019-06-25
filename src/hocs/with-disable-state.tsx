import * as React from "react";
import {Subtract} from "utility-types";


interface IState {
  isDisable: boolean;
}

interface IInjectedProps {
  isDisable: boolean;
  onDisableChange: () => void;
}

// eslint-disable-next-line
function withDisableState(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithDisableState extends React.PureComponent<T, IState> {
    public constructor(props) {
      super(props);

      this.handleSwitchDisable = this.handleSwitchDisable.bind(this);

      this.state = {
        isDisable: false
      };
    }

    public render(): React.ReactElement {
      const {isDisable} = this.state;

      return <Component
        {...this.props}
        isDisable={isDisable}
        onDisableChange={this.handleSwitchDisable}
      />;
    }

    private handleSwitchDisable(): void {
      const {isDisable} = this.state;

      this.setState({
        isDisable: !isDisable
      });
    }
  }
  return WithDisableState;
}

export default withDisableState;
