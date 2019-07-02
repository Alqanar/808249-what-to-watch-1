import * as React from "react";

import FilmCardDetails from "../film-card-details/film-card-details";
import MoviesList from "../movies-list/movies-list";
import GenresList from "../genres-list/genres-list";
import Footer from "../footer/footer";
import withPagination from "../../hocs/with-pagination";
import {IFilm} from "../../types";


interface IProps {
  avatarLink: string;
  featuredFilm: IFilm;
  genres: string[];
  onFilmCardClick: (movie: IFilm) => void;
  isAuth: boolean;
}

const MoviesListWrapped = withPagination(MoviesList);

const MainPage: React.FC<IProps> = (props): React.ReactElement => {
  const {
    avatarLink,
    featuredFilm,
    genres,
    onFilmCardClick,
    isAuth
  } = props;

  return (
    <>
      <FilmCardDetails
        isShort
        avatarLink={avatarLink}
        film={featuredFilm}
        isAuth={isAuth}
        className={`movie-card__info`}
      />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList
            genres={genres}
          />
          <MoviesListWrapped
            onFilmCardClick={onFilmCardClick}
            useAllFilms
          />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
