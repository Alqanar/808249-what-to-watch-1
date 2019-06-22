import * as React from "react";
import {Subtract} from "utility-types";


interface IState {
  isDisable: boolean;
  comment: string;
}

interface IInjectedProps {
  isDisable: boolean;
  isDisableButton: boolean;
  onFormSubmit: () => void;
  onTextareaChange: () => void;
}

// eslint-disable-next-line
function withDisableState(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithDisableState extends React.PureComponent<T, IState> {
    public constructor(props) {
      super(props);

      this.handleSwitchDisable = this.handleSwitchDisable.bind(this);
      this.handleChangeComment = this.handleChangeComment.bind(this);

      this.state = {
        isDisable: false,
        comment: ``
      };
    }

    public render(): React.ReactElement {
      const {isDisable, comment} = this.state;

      return <Component
        {...this.props}
        isDisable={isDisable}
        isDisableButton={comment.length < 50 || comment.length > 400}
        onFormSubmit={this.handleSwitchDisable}
        onTextareaChange={this.handleChangeComment}
      />;
    }

    private handleSwitchDisable(event): void {
      const {isDisable} = this.state;

      event.preventDefault();
      this.setState({
        isDisable: !isDisable
      });
    }

    private handleChangeComment(event): void {

      event.preventDefault();
      this.setState({
        comment: event.target.value
      });
    }

  }
  return WithDisableState;
}

export default withDisableState;
