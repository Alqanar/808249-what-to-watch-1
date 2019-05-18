import React, {Fragment} from "react";
import PropTypes from "prop-types";

import Sprite from "../sprite/sprite.jsx";
import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";
import FeaturedFilmCard from "../featured-film-card/featured-film-card.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import Footer from "../footer/footer.jsx";


const createFeaturedFilmImage = (data) => {
  const {name, coverLink} = data;

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

const MainPage = (props) => {
  const {avatarLink, featuredFilm, genres, moviesList, onClick} = props;

  return (
    <Fragment>
      <Sprite />
      <section className="movie-card">
        {createFeaturedFilmImage(featuredFilm)}

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo />
          <UserBlock
            avatarLink={avatarLink}
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
            films={moviesList}
            onClick={onClick}
          />
          {createButtonShowMore()}
        </section>
        <Footer />
      </div>
    </Fragment>
  );
};

MainPage.propTypes = {
  avatarLink: PropTypes.string.isRequired,
  featuredFilm: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coverLink: PropTypes.string.isRequired,
    posterLink: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }),
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  moviesList: PropTypes.array,
  onClick: PropTypes.func
};

export default MainPage;
