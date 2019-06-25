import * as React from "react";

import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
  isPreview?: boolean;
  width?: string;
  height?: string;
  className?: string;
  isMuted?: boolean;
  isLoop?: boolean;
  isAutoPlay?: boolean;
  onChangeRemainingTime?: () => void;
}

type Ref = HTMLVideoElement

const VideoPlayer = React.forwardRef<Ref, IProps>(
  function createVideoPlayer(props, ref): React.ReactElement {

    const {
      film: {
        posterLink,
        trailer,
        videoLink
      },
      isPreview,
      width,
      height,
      className,
      isMuted,
      isLoop,
      isAutoPlay,
      onChangeRemainingTime
    } = props;

    return (
      <video
        ref={ref}
        poster={isPreview ? posterLink : ``}
        src={isPreview ? trailer : videoLink}
        width={width}
        height={height}
        className={className ? className : ``}
        muted={isMuted}
        loop={isLoop}
        autoPlay={isAutoPlay}
        onTimeUpdate={onChangeRemainingTime}
      />
    );
  }
);

export default VideoPlayer;
