import * as React from "react";

import Sprite from "../sprite/sprite";
import VideoPlayer from "../video-player/video-player";
import {formatTime} from "../../utility";
import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
  isFilmPlaying: boolean;
  progress: number;
  timer: number;
  onSwitchPausePlay: (event: Event) => void;
  onExitButtonClick: () => void;
  onChangeProgress: (progress: number, remainingTime: number) => void;
}

const showPlayerTime = (progress: number, timer: number): React.ReactElement => (
  <div className="player__controls-row">
    <div className="player__time">
      <progress className="player__progress" value={`${progress}`} max="100"></progress>
      <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
    </div>
    <div className="player__time-value">{formatTime(timer)}</div>
  </div>
);

const getButtonPause = (): React.ReactElement => (
  <>
    <svg viewBox="0 0 14 21" width="14" height="21">
      <use xlinkHref="#pause" />
    </svg>
    <span>Pause</span>
  </>
);

const getButtonPlay = (): React.ReactElement => (
  <>
    <svg viewBox="0 0 19 19" width="19" height="19">
      <use xlinkHref="#play-s" />
    </svg>
    <span>Play</span>
  </>
);

const getButtonFullScreen = (handleFullScreenEnter): React.ReactElement => (
  <>
    <button onClick={handleFullScreenEnter} type="button" className="player__full-screen">
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen" />
      </svg>
      <span>Full screen</span>
    </button>
  </>
);


class PlayerPopup extends React.PureComponent<IProps, null> {
  private videoRef = React.createRef<HTMLVideoElement>();

  public constructor(props) {
    super(props);

    this.handleFullScreenEnter = this.handleFullScreenEnter.bind(this);
    this.showControlsPlayer = this.showControlsPlayer.bind(this);
    this.handlePausePlaySwitch = this.handlePausePlaySwitch.bind(this);
    this.handleRemainingTimeChange = this.handleRemainingTimeChange.bind(this);
    this.handleButtonExitClick = this.handleButtonExitClick.bind(this);
  }

  public render(): React.ReactElement {
    const {film, progress, timer} = this.props;

    return (
      <>
        <Sprite />
        <div className="player" style={{zIndex: 5}}>
          <VideoPlayer
            ref={this.videoRef}
            film={film}
            className={`player__video`}
            isAutoPlay
            onChangeRemainingTime={this.handleRemainingTimeChange}
          />
          <button onClick={this.handleButtonExitClick} type="button" className="player__exit">Exit</button>
          <div className="player__controls">
            {showPlayerTime(progress, timer)}
            <div className="player__controls-row">
              {this.showControlsPlayer()}
              <div className="player__name">{film.name}</div>
              {getButtonFullScreen(this.handleFullScreenEnter)}
            </div>
          </div>
        </div>
      </>
    );
  }

  private handleButtonExitClick(event): void {
    const {onExitButtonClick} = this.props;
    event.preventDefault();
    onExitButtonClick();
  }

  private handleRemainingTimeChange(): void {
    const {onChangeProgress} = this.props;
    const player = this.videoRef.current;

    const progress = player.currentTime / player.duration * 100;
    const remainingTime = player.duration - player.currentTime;

    onChangeProgress(progress, remainingTime);
  }

  private handleFullScreenEnter(event): void {
    event.preventDefault();
    this.videoRef.current.requestFullscreen();
  }

  private handlePausePlaySwitch(event): void {
    const {onSwitchPausePlay, isFilmPlaying} = this.props;
    const player = this.videoRef.current;

    event.preventDefault();

    if (isFilmPlaying) {
      player.pause();
    } else {
      player.play();
    }

    onSwitchPausePlay(event);
  }

  private showControlsPlayer(): React.ReactElement {
    const {isFilmPlaying} = this.props;

    return (
      <>
        <button onClick={this.handlePausePlaySwitch} type="button" className="player__play">
          {isFilmPlaying ? getButtonPause() : getButtonPlay()}
        </button>
      </>
    );
  }
}

export default PlayerPopup;
