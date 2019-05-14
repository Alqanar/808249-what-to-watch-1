import React from "react";
import PropTypes from "prop-types";

const createPoster = (name, posterLink) => {
  return (
    <div className="movie-card__poster">
      <img src={posterLink} alt={`${name} poster`} width="218" height="327" />
    </div>
  );
};

const createButtonsForMovieData = () => {
  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list movie-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
    </div>
  );
};

const createMovieData = (name, genre, year) => {
  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre}</span>
        <span className="movie-card__year">{year}</span>
      </p>

      {createButtonsForMovieData()}
    </div>
  );
};

const MovieCardInfo = (props) => {
  const {featuredFilm: {name, posterLink, genre, year}} = props;

  return (
    <div className="movie-card__info">
      {createPoster(name, posterLink)}
      {createMovieData(name, genre, year)}
    </div>
  );
};

MovieCardInfo.propTypes = {
  featuredFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  })
};

export default MovieCardInfo;
