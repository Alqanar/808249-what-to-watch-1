import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import FilmCard from "../film-card/film-card.jsx";


class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: null
    };

    this._handleCardHover = this._handleCardHover.bind(this);
  }

  render() {
    const {films, onClick} = this.props;
    const {activeCardId} = this.state;
    const fillmsList = films.map((film) => (
      <FilmCard
        movie={film}
        key={film.id}
        onClick={onClick}
        onMouseEnter={this._handleCardHover}
        isActive={film.id === activeCardId}
      />
    ));

    return (
      <div className="catalog__movies-list">
        {fillmsList}
      </div>
    );
  }

  _handleCardHover(id) {
    this.setState({
      activeCardId: id
    });
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onClick: PropTypes.func
};

export default MoviesList;
