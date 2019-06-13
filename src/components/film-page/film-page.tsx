import * as React from "react";

import FilmCardDetails from "../film-card-details/film-card-details";
import {IFilm} from "../../types";

interface IProps {
  avatarLink: string;
  isAuth: boolean;
  film: IFilm;
}

const FilmPage: React.FC<IProps> = (props): React.ReactElement => {
  const {
    avatarLink,
    isAuth,
    film
  } = props;

  return (
      <>
        <FilmCardDetails
          avatarLink={avatarLink}
          isAuth={isAuth}
          needVanish
          needReview
          film={film}
        />

      </>
  );
};

export default FilmPage;
