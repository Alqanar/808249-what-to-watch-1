import * as React from "react";

import ShakyWrapper from "../shaky-wrapper/shaky-wrapper";
import FilmPoster from "../film-poster/film-poster";
import MovieMasterData from "../movie-master-data/movie-master-data";
import {IFilm} from "../../types";


interface IProps {
  featuredFilm: IFilm;
  needVanish?: boolean;
  className?: string;
  needReview?: boolean;
}

const FeaturedFilmCard: React.FC<IProps> = (props): React.ReactElement => {
  const {
    featuredFilm: {
      name,
      posterLink,
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
            posterLink={posterLink}
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

export default FeaturedFilmCard;
