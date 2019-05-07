import React from "react";
import PropTypes from "prop-types";

const FilmCard = (props) => {
  const {movie: {name, link}, onClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <button className="small-movie-card__play-btn" type="button">Play</button>
      <div className="small-movie-card__image">
        <img src={link} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a onClick={onClick} className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

FilmCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default FilmCard;
