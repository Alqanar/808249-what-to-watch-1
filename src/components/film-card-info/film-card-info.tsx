import * as React from "react";

import FilmPoster from "../film-poster/film-poster";
import {IFilm} from "../../types";

interface IProps {
  film: IFilm;
  isBig?: boolean;
}

const FilmCardInfo: React.FC<IProps> = (props): React.ReactElement => {
  const {film: {name, posterLink}, isBig} = props;

  return (
    <div className="movie-card__info">
      <FilmPoster
        name={name}
        posterLink={posterLink}
        isBig
      />
    </div>
  );
};

export default FilmCardInfo;
