import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/movie/movie.js";
import GenreListItem from "../genres-list-item/genres-list-item.jsx";


class GenresList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {genres, activeGenre, onSetGenre} = this.props;

    const genresList = genres.map((name, i) =>
      <GenreListItem
        name={name}
        key={i}
        isActive={activeGenre === name}
        onGenreClick={onSetGenre}
      />);

    return (
      <ul className="catalog__genres-list">
        {genresList}
      </ul>
    );
  }
}

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  activeGenre: PropTypes.string.isRequired,
  onSetGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  activeGenre: state.movie.genre
});

const mapDispatchToProps = (dispatch) => ({
  onSetGenre: (clickedGenre) => dispatch(ActionCreator.setGenre(clickedGenre))
});

export {GenresList};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
