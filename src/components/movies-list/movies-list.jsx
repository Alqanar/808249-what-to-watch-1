import React from "react";
import PropTypes from "prop-types";

import FilmCard from "../film-card/film-card.jsx";


const MoviesList = (props) => {
  const {films, onClick} = props;

  const fillmsList = films.map((film) => (
    <FilmCard
      movie={film}
      key={film.id}
      onClick={onClick}
    />
  ));

  return (
    <div className="catalog__movies-list">
      {fillmsList}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default MoviesList;
