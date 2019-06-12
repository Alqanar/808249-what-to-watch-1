import * as React from "react";

import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
}

const decipherFilmScore = (rating): string => {
  if (rating >= 0 && rating < 3) {
    return `Bad`;
  } else if (rating >= 3 && rating < 5) {
    return `Normal`;
  } else if (rating >= 5 && rating < 8) {
    return `Good`;
  } else if (rating >= 8 && rating < 10) {
    return `Very good`;
  } else {
    return `Awesome`;
  }
};

const OverviewTab: React.FC<IProps> = (props): React.ReactElement => {
  const {film: {rating, scoresCount, description, director, starring}} = props;

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{decipherFilmScore(rating)}</span>
          <span className="movie-rating__count">{`${scoresCount} ratings`}</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{description}</p>
        <p className="movie-card__director">
          <strong>{`Director: ${director}`}</strong>
        </p>
        <p className="movie-card__starring">
          <strong>{`Starring: ${starring.join(`, `)}`}</strong>
        </p>
      </div>
    </>
  );
};

export default OverviewTab;
