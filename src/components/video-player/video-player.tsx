import * as React from "react";

import {IFilm} from "../../types";


const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;

interface IProps {
  film: IFilm;
}

type Ref = HTMLVideoElement

const VideoPlayer = React.forwardRef<Ref, IProps>(
  function createVideoPlayer(props, ref): React.ReactElement {

    const {film: {posterLink, trailer}} = props;

    return (
      <video
        ref={ref}
        poster={posterLink}
        src={trailer}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        muted
        loop
      />
    );
  }
);

export default VideoPlayer;
