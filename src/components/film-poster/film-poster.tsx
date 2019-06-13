import * as React from "react";


const WIDTH_IMG = `218`;
const HEIGHT_IMG = `327`;

interface IProps {
  name: string;
  posterImage: string;
  isBig?: boolean;
}

const FilmPoster: React.FC<IProps> = (props): React.ReactElement => {
  const {name, posterImage, isBig} = props;

  return (
    <div className={`movie-card__poster ${isBig ? `movie-card__poster--big` : ``}`}>
      <img src={posterImage} alt={`${name} poster`} width={WIDTH_IMG} height={HEIGHT_IMG} />
    </div>
  );
};

export default FilmPoster;
