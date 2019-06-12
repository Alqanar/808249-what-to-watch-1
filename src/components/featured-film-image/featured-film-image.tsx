import * as React from "react";
import {IFilm} from "../../types";

interface IProps {
  film: IFilm;
}

const FeaturedFilmImage: React.FC<IProps> = (props): React.ReactElement => {
  const {name, coverLink} = props.film;

  return (
    <div className="movie-card__bg">
      <img src={coverLink} alt={name} />
    </div>
  );
};

export default FeaturedFilmImage;
