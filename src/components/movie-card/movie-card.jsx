import React from "react";
import PropTypes from "prop-types";

import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";
import MovieCardInfo from "../movie-card-info/movie-card-info.jsx";


const createFeaturedFilmImage = (data) => {
  const {name, coverLink} = data;

  return (
    <div className="movie-card__bg">
      <img src={coverLink} alt={name} />
    </div>
  );
};

const MovieCard = (props) => {
  const {avatarLink, featuredFilm} = props;

  return (
    <section className="movie-card">
      {createFeaturedFilmImage(featuredFilm)}

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <Logo />
        <UserBlock
          avatarLink={avatarLink}
        />
      </header>

      <div className="movie-card__wrap">
        <MovieCardInfo
          featuredFilm={featuredFilm}
        />
      </div>
    </section>
  );
};

MovieCard.propTypes = {
  avatarLink: PropTypes.string,
  featuredFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coverLink: PropTypes.string.isRequired,
    posterLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  })
};

export default MovieCard;
