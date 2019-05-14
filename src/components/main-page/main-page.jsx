import React, {Fragment} from "react";
import PropTypes from "prop-types";

import Sprite from "../sprite/sprite.jsx";
import MovieCard from "../movie-card/movie-card.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import Footer from "../footer/footer.jsx";


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
      <MovieCard
        avatarLink={avatarLink}
        featuredFilm={featuredFilm}
      />
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
