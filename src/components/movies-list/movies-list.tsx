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
  onMoreButtonClick: () => void;
  currentLength: number;
  resetCurrentLength: () => void;
}

class MoviesList extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);
  }

  public componentDidUpdate(oldProps: IProps): void {
    const {films, resetCurrentLength} = this.props;

    if (films.length !== oldProps.films.length) {
      resetCurrentLength();
    }
  }

  public render(): React.ReactElement {
    const {onMoreButtonClick, films, currentLength = films.length} = this.props;

    return (
      <>
        <div className="catalog__movies-list">
          {this.filmsList}
        </div>
        <div className={`catalog__more ${currentLength >= films.length ? `visually-hidden` : ``}`}>
          <button onClick={onMoreButtonClick} className="catalog__button" type="button">Show more</button>
        </div>
      </>
    );
  }

  private get filmsList(): React.ReactElement {
    const {
      films,
      onClick,
      useAllFilms,
      fiteredGenre,
      limit,
      excludeFilmId,
      currentLength = films.length
    } = this.props;

    const list = useAllFilms ? films : moviesListMock;
    const filmsLimit = limit ? limit : currentLength;

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
          film={film}
          key={film.id}
          onClick={onClick}
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
