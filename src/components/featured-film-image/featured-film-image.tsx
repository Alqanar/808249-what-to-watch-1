import * as React from "react";
import {Film} from "../../types";

interface IProps {
  film: Film;
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
