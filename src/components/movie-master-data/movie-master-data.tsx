import * as React from "react";

import MovieCardButtons from "../movie-card-buttons/movie-card-buttons";


interface IProps {
  name: string;
  genre: string[];
  year: number;
  needReview?: boolean;
}

const MovieMasterData: React.FC<IProps> = (props): React.ReactElement => {
  const {name, genre, year, needReview} = props;

  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre.join(`, `)}</span>
        <span className="movie-card__year">{year}</span>
      </p>

      <MovieCardButtons
        needReview={needReview}
      />

    </div>
  );
};

export default MovieMasterData;
