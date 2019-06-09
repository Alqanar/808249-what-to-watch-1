import React, {forwardRef} from "react";
import PropTypes from "prop-types";


const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;

const VideoPlayer = forwardRef(
    function createVideoPlayer(props, ref) {

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

VideoPlayer.propTypes = {
  film: PropTypes.shape({
    posterLink: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired
  }).isRequired
};

export default VideoPlayer;
