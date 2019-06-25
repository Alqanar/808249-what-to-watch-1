import * as React from "react";
import {Subtract} from "utility-types";


interface IState {
  comment: string;
}

interface IInjectedProps {
  isDisableButton: boolean;
  onTextareaChange: () => void;
}

// eslint-disable-next-line
function withCommentLimitation(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithCommentLimitation extends React.PureComponent<T, IState> {
    public constructor(props) {
      super(props);

      this.handleChangeComment = this.handleChangeComment.bind(this);

      this.state = {
        comment: ``
      };
    }

    public render(): React.ReactElement {
      const {comment} = this.state;

      return <Component
        {...this.props}
        isDisableButton={comment.length < 50 || comment.length > 400}
        onTextareaChange={this.handleChangeComment}
      />;
    }

    private handleChangeComment(event): void {
      event.preventDefault();
      this.setState({
        comment: event.target.value
      });
    }

  }
  return WithCommentLimitation;
}

export default withCommentLimitation;
