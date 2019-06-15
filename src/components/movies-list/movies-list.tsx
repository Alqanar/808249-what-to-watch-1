import * as React from "react";
import {connect} from "react-redux";

import FilmCard from "../film-card/film-card";
import {getFilterFilms} from "../../reducer/movie/selectors.js";
import {moviesListMock} from "../main-page/test-mock-data.js";
import {IFilm} from "../../types";


interface IProps {
  films: IFilm[];
  onClick: (films: IFilm) => void;
  useAllFilms: boolean;
  fiteredGenre?: string[];
  limit?: number;
  excludeFilmId?: string;
}

class MoviesList extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);
  }

  public render(): React.ReactElement {
    return (
      <div className="catalog__movies-list">
        {this.filmsList}
      </div>
    );
  }

  private get filmsList(): React.ReactElement {
    const {
      films,
      onClick,
      useAllFilms,
      fiteredGenre,
      limit,
      excludeFilmId
    } = this.props;

    const list = useAllFilms ? films : moviesListMock;
    const filmsLimit = limit ? limit : films.length;

    return list
      .filter(({id, genre}): boolean => {
        if (id === excludeFilmId) {
          return false;
        }
        if (!fiteredGenre) {
          return true;
        }
        return genre
          .some((item): boolean => fiteredGenre
            .some((filtereGenreItem): boolean => item === filtereGenreItem));
      })
      .splice(0, filmsLimit)
      .map((film): React.ReactElement => (
        <FilmCard
          movie={film}
          key={film.id}
          onClick={onClick}
          useAllFilms={useAllFilms}
        />
      ));
  }
}


const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  films: getFilterFilms(state)
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
