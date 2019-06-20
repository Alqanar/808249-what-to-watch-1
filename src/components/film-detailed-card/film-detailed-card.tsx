import * as React from "react";

import ShakyWrapper from "../shaky-wrapper/shaky-wrapper";
import FilmPoster from "../film-poster/film-poster";
import MovieMasterData from "../movie-master-data/movie-master-data";
import withPlayerPopup from "../../hocs/with-player-popup";
import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
  needVanish?: boolean;
  className?: string;
  needReview?: boolean;
}

const MovieMasterDataWrapped = withPlayerPopup(MovieMasterData);

const FilmDetailedCard: React.FC<IProps> = (props): React.ReactElement => {
  const {
    film,
    film: {
      name,
      posterImage
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

        <MovieMasterDataWrapped
          film={film}
          needReview={needReview}
        />
      </>
    </ShakyWrapper>
  );
};

export default FilmDetailedCard;
