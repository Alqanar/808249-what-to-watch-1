import * as React from "react";

import ShakyWrapper from "../shaky-wrapper/shaky-wrapper";
import FilmPoster from "../film-poster/film-poster";
import MovieMasterData from "../movie-master-data/movie-master-data";
import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
  needVanish?: boolean;
  className?: string;
  needReview?: boolean;
}

const FilmDetailedCard: React.FC<IProps> = (props): React.ReactElement => {
  const {
    film: {
      name,
      posterImage,
      genre,
      released
    },
    needVanish,
    className,
    needReview
  } = props;

  return (
    <ShakyWrapper
      needVanish={needVanish}
      className={className}
    >
      <>
        {needVanish ? `` :
          <FilmPoster
            name={name}
            posterImage={posterImage}
          />
        }

        <MovieMasterData
          name={name}
          genre={genre}
          year={released}
          needReview={needReview}
        />
      </>
    </ShakyWrapper>
  );
};

export default FilmDetailedCard;
