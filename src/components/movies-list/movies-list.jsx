import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import FilmCard from "../film-card/film-card.jsx";
import {getFilterFilms} from "../../reducer/movie/selectors.js";


class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, onClick} = this.props;

    const filmsList = films.map((film) => (
      <FilmCard
        movie={film}
        key={film.id}
        onClick={onClick}
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
  onClick: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  films: getFilterFilms(state)
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
