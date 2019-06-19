import * as React from "react";
import {Subtract} from "utility-types";

interface IState {
  isFilmPlaying: boolean;
  progress: number;
  remainingTime: number;
}

interface IInjectedProps {
  progress: number;
  timer: number;
  isFilmPlaying: boolean;
  onSwitchPausePlay: () => void;
  onChangeProgress: (progress: number, remainingTime: number) => void;
}

// eslint-disable-next-line
function withPlayer(Component) {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, IInjectedProps>;

  class WithPlayer extends React.PureComponent<T, IState> {
    public constructor(props) {
      super(props);

      this.handleSwitchPlayingState = this.handleSwitchPlayingState.bind(this);
      this.handleChangeProgressState = this.handleChangeProgressState.bind(this);

      this.state = {
        isFilmPlaying: true,
        progress: 0,
        remainingTime: 0
      };
    }

    public render(): React.ReactElement {
      const {isFilmPlaying, progress, remainingTime} = this.state;

      return <Component
        {...this.props}
        progress={progress}
        timer={remainingTime}
        isFilmPlaying={isFilmPlaying}
        onSwitchPausePlay={this.handleSwitchPlayingState}
        onChangeProgress={this.handleChangeProgressState}
      />;
    }

    private handleChangeProgressState(progress: number, remainingTime: number): void {
      this.setState({
        progress,
        remainingTime
      });
    }

    private handleSwitchPlayingState(event): void {
      const {isFilmPlaying} = this.state;

      event.preventDefault();
      this.setState({
        isFilmPlaying: !isFilmPlaying
      });
    }

  }
  return WithPlayer;
}

export default withPlayer;
