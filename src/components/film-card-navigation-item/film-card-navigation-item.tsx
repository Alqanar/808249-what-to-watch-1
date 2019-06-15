import * as React from "react";


interface IProps {
  name: string;
}

const FilmCardNavigationItem: React.FC<IProps> = (props): React.ReactElement => {
  const {name} = props;

  return (
    <li
      className={`movie-nav__item`}
    >
      <a
        href="#"
        className="movie-nav__link"
      >
        {name}
      </a>
    </li>
  );
};

export default FilmCardNavigationItem;
