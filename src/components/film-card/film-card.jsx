import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardMouseEnter = this._handleCardMouseEnter.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    const {movie: {name, link}} = this.props;

    return (
      <article onClick={this._handleCardClick} onMouseEnter={this._handleCardMouseEnter} className="small-movie-card catalog__movies-card">
        <button className="small-movie-card__play-btn" type="button">Play</button>
        <div className="small-movie-card__image">
          <img src={link} alt={name} width="280" height="175" />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{name}</a>
        </h3>
      </article>
    );
  }

  _handleCardClick() {
    const {movie, onClick} = this.props;

    onClick(movie);
  }

  _handleCardMouseEnter() {
    const {movie: {id}, onMouseEnter} = this.props;

    onMouseEnter(id);
  }
}

FilmCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  isActive: PropTypes.bool.isRequired
};

export default FilmCard;
