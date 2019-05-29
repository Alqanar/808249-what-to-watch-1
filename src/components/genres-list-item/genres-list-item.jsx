import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class GenresListItem extends PureComponent {
  constructor(props) {
    super(props);

    this._handleGenreItemClick = this._handleGenreItemClick.bind(this);
  }

  render() {
    const {name, isActive} = this.props;

    return (
      <li
        className={
          `catalog__genres-item ${isActive ? `catalog__genres-item--active` : ``}`
        }
      >
        <a
          onClick={this._handleGenreItemClick}
          href="#"
          className="catalog__genres-link"
        >
          {name}
        </a>
      </li>
    );
  }

  _handleGenreItemClick(event) {
    const {filmGenre, onGenreClick} = this.props;

    event.preventDefault();
    onGenreClick(filmGenre);
  }
}

GenresListItem.propTypes = {
  name: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func,
  isActive: PropTypes.bool
};

export default GenresListItem;
