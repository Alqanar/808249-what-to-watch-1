import * as React from "react";

import FilmCardNavigation from "../film-card-navigation/film-card-navigation";
import FilmDetailedCard from "../film-detailed-card/film-detailed-card";
import FilmImageBackground from "../film-image-background/film-image-background";
import FilmPoster from "../film-poster/film-poster";
import Logo from "../logo/logo";
import ShakyWrapper from "../shaky-wrapper/shaky-wrapper";
import Sprite from "../sprite/sprite";
import UserBlock from "../user-block/user-block";
import {IFilm} from "../../types";


interface IProps {
  isShort?: boolean;
  avatarLink: string;
  isAuth: boolean;
  needVanish?: boolean;
  className?: string;
  needReview?: boolean;
  film: IFilm;
}

const FilmCardDetails: React.FC<IProps> = (props): React.ReactElement => {
  const {
    isShort,
    avatarLink,
    isAuth,
    needVanish,
    className,
    needReview,
    film
  } = props;

  return (
    <>
      <Sprite />
      <section
        className={`movie-card ${isShort ? `` : `movie-card--full`}`}
        style={{background: film.backgroundColor}}>
        <ShakyWrapper
          needVanish={isShort}
          className={isShort ? `` : `movie-card__hero`}
        >
          <>
            <FilmImageBackground
              film={film}
            />

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo
                hrefLink={isShort ? `#` : `/`}
              />
              <UserBlock
                avatarLink={avatarLink}
                isAuth={isAuth}
              />
            </header>

            <div className="movie-card__wrap">
              <FilmDetailedCard
                film={film}
                needVanish={needVanish}
                className={className}
                needReview={needReview}
              />
            </div>
          </>
        </ShakyWrapper>
        {!isShort && (
          <>
            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <FilmPoster
                  name={film.name}
                  posterImage={film.posterImage}
                  size="L"
                />
                <FilmCardNavigation
                  film={film}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default FilmCardDetails;
