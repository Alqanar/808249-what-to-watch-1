import * as React from "react";


const WIDTH_IMG = `218`;
const HEIGHT_IMG = `327`;

interface IProps {
  name: string;
  posterLink: string;
  isBig?: boolean;
}

const FilmPoster: React.FC<IProps> = (props): React.ReactElement => {
  const {name, posterLink, isBig} = props;

  return (
    <div className={`movie-card__poster ${isBig ? `movie-card__poster--big` : ``}`}>
      <img src={posterLink} alt={`${name} poster`} width={WIDTH_IMG} height={HEIGHT_IMG} />
    </div>
  );
};

export default FilmPoster;
