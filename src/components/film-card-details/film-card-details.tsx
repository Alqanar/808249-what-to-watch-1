import * as React from "react";

import Sprite from "../sprite/sprite";
import ShakyWrapper from "../shaky-wrapper/shaky-wrapper";
import FeaturedFilmImage from "../featured-film-image/featured-film-image";
import Logo from "../logo/logo";
import UserBlock from "../user-block/user-block";
import FeaturedFilmCard from "../featured-film-card/featured-film-card";


interface IProps {
  isShort: boolean;
  needVanish: boolean;
  className: string;
  needReview: boolean;
}

const FilmCardDetails: React.FC<IProps> = (props): React.ReactElement => {
  const {
    isShort,
    avatarLink,
    featuredFilm,
    genres,
    onClick,
    isAuth,
    needVanish,
    className,
    needReview
  } = props;

  return (
    <>
      <Sprite />
      <section className={`movie-card ${isShort ? `` : `movie-card--full`}`}>
        <ShakyWrapper
          needVanish={isShort}
          className={isShort ? `` : `movie-card__hero`}
        >
          <>
            <FeaturedFilmImage
              film={featuredFilm}
            />

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo />
              <UserBlock
                avatarLink={avatarLink}
                isAuth={isAuth}
              />
            </header>

            <div className="movie-card__wrap">
              <FeaturedFilmCard
                featuredFilm={featuredFilm}
                needVanish={needVanish}
                className={className}
                needReview={needReview}
              />
            </div>
          </>
        </ShakyWrapper>
        {!isShort && (
          
        )}
      </section>
    </>
  );

}

export default FilmCardDetails;
