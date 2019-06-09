import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import FilmCard from "../film-card/film-card.jsx";
import {getFilterFilms} from "../../reducer/movie/selectors.js";
import {moviesListMock} from "../main-page/test-mock-data.js";


class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onClick, isMainPage} = this.props;
    const list = isMainPage ? films : moviesListMock;
    const filmsList = list.map((film) => (
      <FilmCard
        movie={film}
        key={film.id}
        onClick={onClick}
        isMainPage={isMainPage}
      />
    ));

    return (
      <div className="catalog__movies-list">
        {filmsList}
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  isMainPage: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  films: getFilterFilms(state)
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
