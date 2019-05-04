import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import Logo from '../logo/logo.jsx';


const createSprite = () => {
  return (
    <div className="visually-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <symbol id="add" viewBox="0 0 19 20">
          <title>+</title>
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <polygon
              id="+"
              fill="#EEE5B5"
              points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"
            />
          </g>
        </symbol>
        <symbol id="full-screen" viewBox="0 0 27 27">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z"
            fill="#FFF9D9"
            fillOpacity="0.7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z"
            fill="#FFF9D9"
            fillOpacity="0.7"/>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z"
            fill="#FFF9D9"
            fillOpacity="0.7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z"
            fill="#FFF9D9"
            fillOpacity="0.7"
          />
        </symbol>
        <symbol id="in-list" viewBox="0 0 18 14">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z"
            fill="#EEE5B5"
          />
        </symbol>
        <symbol id="pause" viewBox="0 0 14 21">
          <title>Artboard</title>
          <g
            id="Artboard"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd">
            <polygon
              id="Line"
              fill="#EEE5B5"
              fillRule="nonzero"
              points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"
            />
            <polygon
              id="Line"
              fill="#EEE5B5"
              fillRule="nonzero"
              points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"
            />
          </g>
        </symbol>
        <symbol id="play-s" viewBox="0 0 19 19">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0L19 9.5L0 19V0Z"
            fill="#EEE5B5"
          />
        </symbol>
      </svg>
    </div>
  );
};

const createFeaturedFilmImage = (imageLink, name) => {
  return (
    <div className="movie-card__bg">
      <img src={imageLink} alt={name} />
    </div>
  );
};

const createUserBlock = (avatarLink = `img/avatar.jpg`) => {
  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img src={avatarLink} alt="User avatar" width="63" height="63" />
      </div>
    </div>
  );
};

const createPoster = (posterLink, name) => {
  return (
    <div className="movie-card__poster">
      <img src={posterLink} alt={`${name} poster`} width="218" height="327" />
    </div>
  );
};

const createButtonsForMovieData = () => {
  return (
    <div className="movie-card__buttons">
      <button className="btn btn--play movie-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"/>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list movie-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"/>
        </svg>
        <span>My list</span>
      </button>
    </div>
  );
};

const createMovieData = (name, genre, year) => {
  return (
    <div className="movie-card__desc">
      <h2 className="movie-card__title">{name}</h2>
      <p className="movie-card__meta">
        <span className="movie-card__genre">{genre}</span>
        <span className="movie-card__year">{year}</span>
      </p>

      {createButtonsForMovieData()}
    </div>
  );
};

const createMovieCardInfo = (posterLink, name, genre, year) => {
  return (
    <div className="movie-card__info">
      {createPoster(posterLink, name)}
      {createMovieData(name, genre, year)}
    </div>
  );
};

const createMovieCard = (data) => {
  const {name, coverImgLink, posterImgLink, genre, year} = data;
  return (
    <section className="movie-card">
      {createFeaturedFilmImage(coverImgLink, name)}

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <Logo />
        {createUserBlock()}
      </header>

      <div className="movie-card__wrap">
        {createMovieCardInfo(posterImgLink, name, genre, year)}
      </div>
    </section>
  );
};

const createItemGenresList = (name, key) => {
  return (
    <li className="catalog__genres-item catalog__genres-item--active" key={key}>
      <a href="#" className="catalog__genres-link">{name}</a>
    </li>
  );
};

const createGenresList = (genres) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((name, i) => createItemGenresList(name, i))}
    </ul>
  );
};

const createItemMoviesList = (name, link, key) => {
  return (
    <article className="small-movie-card catalog__movies-card" key={key}>
      <button className="small-movie-card__play-btn" type="button">Play</button>
      <div className="small-movie-card__image">
        <img src={link} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

const createMoviesList = (moviesList) => {
  return (
    <div className="catalog__movies-list">
      {moviesList.map(({name, imageLink}, i) => createItemMoviesList(name, imageLink, i))}
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

const createFooter = () => {
  return (
    <footer className="page-footer">
      <Logo
        className="logo__link--light"
      />

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

const MainPage = (props) => {
  const {featuredFilm, genres, moviesList} = props;

  return (
    <Fragment>
      {createSprite()}
      {createMovieCard(featuredFilm)}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {createGenresList(genres)}
          {createMoviesList(moviesList)}
          {createButtonShowMore()}
        </section>
        {createFooter()}
      </div>
    </Fragment>
  );
};

MainPage.propTypes = {
  featuredFilm: PropTypes.object,
  genres: PropTypes.PropTypes.array,
  moviesList: PropTypes.PropTypes.array
};

export default MainPage;
