import * as React from "react";

import MovieMasterData from "../movie-master-data/movie-master-data"
import { Film } from "../../types";


interface IProps {
  featuredFilm: Film
};

const createPoster = (name, posterLink) => {
  return (
    <div className="movie-card__poster">
      <img src={posterLink} alt={`${name} poster`} width="218" height="327" />
    </div>
  );
};

const FeaturedFilmCard: React.FC<IProps> = (props) => {
  const { featuredFilm: { name, posterLink, genre, released } } = props;

  return (
    <div className="movie-card__info">
      {createPoster(name, posterLink)}

      <MovieMasterData
        name={name}
        genre={genre}
        year={released}
      />
    </div>
  );
};

export default FeaturedFilmCard;
