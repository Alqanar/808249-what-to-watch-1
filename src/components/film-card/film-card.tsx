import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player.jsx";


class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);

    this._videoRef = createRef();

    this._timeOutPlayVideo = null;
  }

  render() {
    const {movie, movie: {name, posterLink}, isMainPage} = this.props;

    return (
      <article
        onClick={this._handleCardClick}
        onMouseEnter={isMainPage ? this._handleCardMouseEnter : undefined}
        onMouseLeave={isMainPage ? this._handleCardMouseLeave : undefined}
        className="small-movie-card catalog__movies-card"
      >
        {isMainPage ? `` : (
          <button className="small-movie-card__play-btn" type="button">Play</button>
        )}
        <div className="small-movie-card__image">
          {isMainPage ? (
            <VideoPlayer
              ref={this._videoRef}
              film={movie}
            />
          ) : (
            <img
              src={posterLink}
              alt={name}
              width="280"
              height="175"
            />
          )}
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{name}</a>
        </h3>
      </article>
    );
  }

  _handleCardClick() {
    const {movie, onClick} = this.props;

    onClick(movie);
  }

  _handleCardMouseEnter() {
    this._timeOutPlayVideo = setTimeout(() => this._playVideo(), 1000);
  }

  _handleCardMouseLeave() {
    clearTimeout(this._timeOutPlayVideo);
    this._stopVideo();
  }

  _playVideo() {
    this._videoRef.current.play();
  }

  _stopVideo() {
    const video = this._videoRef.current;

    video.pause();
    video.currentTime = 0;
    video.load();
  }
}

FilmCard.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterLink: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func,
  isMainPage: PropTypes.bool.isRequired
};

export default FilmCard;
