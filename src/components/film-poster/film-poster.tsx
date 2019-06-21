import * as React from "react";


const WIDTH_IMG = `218`;
const HEIGHT_IMG = `327`;

interface IProps {
  name: string;
  posterImage: string;
  size?: `S` | `M` | `L`;
}

const FilmPoster: React.FC<IProps> = (props): React.ReactElement => {
  const {name, posterImage, size = `M`} = props;
  let sizeClass;
  switch (size) {
    case `S`:
      sizeClass = `movie-card__poster--small`;
      break;
    case `L`:
      sizeClass = `movie-card__poster--big`;
      break;
    default:
      sizeClass = ``;
  }

  return (
    <div className={`movie-card__poster ${sizeClass}`}>
      <img src={posterImage} alt={`${name} poster`} width={WIDTH_IMG} height={HEIGHT_IMG} />
    </div>
  );
};

export default FilmPoster;
