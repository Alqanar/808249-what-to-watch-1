import * as React from "react";

import Sprite from "../sprite/sprite";
import Logo from "../logo/logo";
import UserBlock from "../user-block/user-block";
import FeaturedFilmCard from "../featured-film-card/featured-film-card";
import MoviesList from "../movies-list/movies-list";
import GenresList from "../genres-list/genres-list";
import Footer from "../footer/footer";
import { Film } from "../../types";


interface IProps {
  avatarLink: string,
  featuredFilm: Film,
  genres: string[],
  onClick: (movie: Film) => Film,
  isAuth: boolean
};

const createFeaturedFilmImage = (data) => {
  const { name, coverLink } = data;

  return (
    <div className="movie-card__bg">
      <img src={coverLink} alt={name} />
    </div>
  );
};

const createButtonShowMore = () => {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

const MainPage: React.FC<IProps> = (props) => {
  const {
    avatarLink,
    featuredFilm,
    genres,
    onClick,
    isAuth
  } = props;

  return (
    <>
      <Sprite />
      <section className="movie-card">
        {createFeaturedFilmImage(featuredFilm)}

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
          />
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList
            genres={genres}
          />
          <MoviesList
            onClick={onClick}
            isMainPage={true}
          />
          {createButtonShowMore()}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
