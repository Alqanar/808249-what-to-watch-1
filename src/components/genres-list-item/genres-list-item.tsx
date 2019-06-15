import * as React from "react";


interface IProps {
  name: string;
  onGenreClick: (name: string) => Promise<void>;
  isActive: boolean;
}

class GenresListItem extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.handleGenreItemClick = this.handleGenreItemClick.bind(this);
  }

  public render(): React.ReactElement {
    const {name, isActive} = this.props;

    return (
      <li
        className={
          `catalog__genres-item ${isActive ? `catalog__genres-item--active` : ``}`
        }
      >
        <a
          onClick={this.handleGenreItemClick}
          href="#"
          className="catalog__genres-link"
        >
          {name}
        </a>
      </li>
    );
  }

  private handleGenreItemClick(event): void {
    const {name, onGenreClick} = this.props;

    event.preventDefault();
    onGenreClick(name);
  }
}

export default GenresListItem;
