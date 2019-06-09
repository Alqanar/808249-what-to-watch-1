import * as React from "react";

import VideoPlayer from "../video-player/video-player";
import { Film } from "../../types";


const IMG_WIDTH = "280";
const IMG_HEIGHT = "175";

interface IProps {
  movie: Film,
  onClick: (movie: Film) => Film,
  isMainPage: boolean
};

class FilmCard extends React.PureComponent<IProps, null> {
  private videoRef = React.createRef<HTMLVideoElement>();
  private timeOutPlayVideo: number | null = null;

  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardMouseLeave = this._handleCardMouseLeave.bind(this);
  }

  render() {
    const { movie, movie: { name, posterLink }, isMainPage } = this.props;

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
              ref={this.videoRef}
              film={movie}
            />
          ) : (
              <img
                src={posterLink}
                alt={name}
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
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
    const { movie, onClick } = this.props;

    onClick(movie);
  }

  _handleCardMouseEnter() {
    this.timeOutPlayVideo = window.setTimeout(() => this._playVideo(), 1000);
  }

  _handleCardMouseLeave() {
    clearTimeout(this.timeOutPlayVideo);
    this._stopVideo();
  }

  _playVideo() {
    this.videoRef.current.play();
  }

  _stopVideo() {
    const video = this.videoRef.current;

    video.pause();
    video.currentTime = 0;
    video.load();
  }
}


export default FilmCard;
