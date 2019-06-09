import * as React from "react";
import { connect } from "react-redux";

import FilmCard from "../film-card/film-card";
import { getFilterFilms } from "../../reducer/movie/selectors.js";
import { moviesListMock } from "../main-page/test-mock-data.js";
import { Film } from "../../types";


interface IProps {
  films: Film[],
  onClick: () => Film
  isMainPage: boolean
};

class MoviesList extends React.PureComponent<IProps, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const { films, onClick, isMainPage } = this.props;
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


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  films: getFilterFilms(state)
});

export { MoviesList };

export default connect(mapStateToProps)(MoviesList);
