import * as React from "react";

import VideoPlayer from "../video-player/video-player";
import {IFilm} from "../../types";


const IMG_WIDTH = `280`;
const IMG_HEIGHT = `175`;

interface IProps {
  movie: IFilm;
  onClick: (movie: IFilm) => IFilm;
  isMainPage: boolean;
}

class FilmCard extends React.PureComponent<IProps, null> {
  private videoRef = React.createRef<HTMLVideoElement>();
  private timeOutPlayVideo: number | null = null;

  public constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleCardMouseEnter = this.handleCardMouseEnter.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }

  public render(): React.ReactElement {
    const {movie, movie: {name, posterLink}, isMainPage} = this.props;

    return (
      <article
        onClick={this.handleCardClick}
        onMouseEnter={isMainPage ? this.handleCardMouseEnter : undefined}
        onMouseLeave={isMainPage ? this.handleCardMouseLeave : undefined}
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

  private handleCardClick(): void {
    const {movie, onClick} = this.props;

    onClick(movie);
  }

  private handleCardMouseEnter(): void {
    this.timeOutPlayVideo = window.setTimeout((): void => this.playVideo(), 1000);
  }

  private handleCardMouseLeave(): void {
    clearTimeout(this.timeOutPlayVideo);
    this.stopVideo();
  }

  private playVideo(): void {
    this.videoRef.current.play();
  }

  private stopVideo(): void {
    const video = this.videoRef.current;

    video.pause();
    video.currentTime = 0;
    video.load();
  }
}


export default FilmCard;
