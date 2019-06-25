import * as React from "react";
import {Subtract} from "utility-types";


const DEFAULT_PAGE_SIZE = 20;

interface IProps {
  pageSize?: number;
}

interface IInjectedProps {
  currentLength: number;
  onMoreButtonClick: () => void;
  onResetCurrentLength: () => void;
}

interface IState {
  currentLength: number;
}

// eslint-disable-next-line
function withPagination(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithPagination extends React.PureComponent<IProps & T, IState> {
    public constructor(props) {
      super(props);

      this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
      this.onResetCurrentLength = this.onResetCurrentLength.bind(this);

      this.state = {
        currentLength: props.pageSize || DEFAULT_PAGE_SIZE
      };
    }

    public render(): React.ReactElement {
      const {currentLength} = this.state;

      return <Component
        {...this.props}
        onMoreButtonClick={this.handleMoreButtonClick}
        currentLength={currentLength}
        onResetCurrentLength={this.onResetCurrentLength}
      />;
    }

    private handleMoreButtonClick(event): void {
      const {currentLength} = this.state;
      const {pageSize = DEFAULT_PAGE_SIZE} = this.props;

      event.preventDefault();
      this.setState({
        currentLength: currentLength + pageSize
      });
    }

    private onResetCurrentLength(): void {
      const {pageSize = DEFAULT_PAGE_SIZE} = this.props;

      this.setState({
        currentLength: pageSize
      });
    }

  }

  return WithPagination;
}

export default withPagination;
