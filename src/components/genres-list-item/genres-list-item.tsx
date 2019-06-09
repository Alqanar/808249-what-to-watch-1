import * as React from "react";


interface IProps {
  name: string,
  onGenreClick: (name: string) => Promise<void>,
  isActive: boolean
};

class GenresListItem extends React.PureComponent<IProps, null> {
  constructor(props) {
    super(props);

    this._handleGenreItemClick = this._handleGenreItemClick.bind(this);
  }

  render() {
    const { name, isActive } = this.props;

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
    const { name, onGenreClick } = this.props;

    event.preventDefault();
    onGenreClick(name);
  }
}

export default GenresListItem;
