import * as React from "react";
import {Link} from "react-router-dom";

import VideoPlayer from "../video-player/video-player";
import {IFilm} from "../../types";


const IMG_WIDTH = `280`;
const IMG_HEIGHT = `175`;

interface IProps {
  film: IFilm;
  onFilmCardClick: (film: IFilm) => void;
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
    const {film} = this.props;

    return (
      <article
        onClick={this.handleCardClick}
        onMouseEnter={this.handleCardMouseEnter}
        onMouseLeave={this.handleCardMouseLeave}
        className="small-movie-card catalog__movies-card"
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            ref={this.videoRef}
            film={film}
            isPreview
            width={IMG_WIDTH}
            height={IMG_HEIGHT}
            isMuted
            isLoop
          />
        </div>
        <h3 className="small-movie-card__title">
          <Link to={`/film/${film.id}`} className="small-movie-card__link">{film.name}</Link>
        </h3>
      </article>
    );
  }

  private handleCardClick(): void {
    const {film, onFilmCardClick} = this.props;

    onFilmCardClick(film);
  }

  private handleCardMouseEnter(): void {
    this.timeOutPlayVideo = window.setTimeout((): void => this.playVideo(), 1000);
  }

  private handleCardMouseLeave(): void {
    clearTimeout(this.timeOutPlayVideo);
    this.stopVideo();
  }

  private playVideo(): void {
    const video = this.videoRef.current;
    if (video) {
      video.play();
    }
  }

  private stopVideo(): void {
    const video = this.videoRef.current;

    video.pause();
    video.currentTime = 0;
    video.load();
  }
}


export default FilmCard;
