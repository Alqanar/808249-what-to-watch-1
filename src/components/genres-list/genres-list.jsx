import React from "react";
import PropTypes from "prop-types";


const createItemGenresList = (name, key) => {
  return (
    <li className="catalog__genres-item catalog__genres-item--active" key={key}>
      <a href="#" className="catalog__genres-link">{name}</a>
    </li>
  );
};

const GenresList = (props) => {
  const {genres} = props;
  const genresList = genres.map((name, i) => createItemGenresList(name, i));

  return (
    <ul className="catalog__genres-list">
      {genresList}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default GenresList;
