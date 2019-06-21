import * as React from "react";
import {Link} from "react-router-dom";

import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
}

const Breadcrumbs: React.FC<IProps> = (props): React.ReactElement => {
  const {film: {id, name}} = props;
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/film/${id}`} className="breadcrumbs__link">{name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
