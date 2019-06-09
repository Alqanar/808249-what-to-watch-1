import React, {Fragment} from "react";
import PropTypes from "prop-types";

import Sprite from "../sprite/sprite.jsx";
import Logo from "../logo/logo.jsx";
import UserBlock from "../user-block/user-block.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Footer from "../footer/footer.jsx";

const FavouritePage = (props) => {
  const {
    avatarLink,
    isAuth,
    onClick,
  } = props;

  return (
    <Fragment>
      <Sprite />
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo
            hrefLink='/'
          />
          <h1 className="page-title user-page__title">My list</h1>
          <UserBlock
            avatarLink={avatarLink}
            isAuth={isAuth}
          />
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MoviesList
            onClick={onClick}
            isMainPage={false}
          />
        </section>
        <Footer
          hrefLink='/'
        />
      </div>
    </Fragment>
  );
};

FavouritePage.propTypes = {
  avatarLink: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default FavouritePage;
