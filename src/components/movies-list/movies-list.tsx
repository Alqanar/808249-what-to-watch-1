import * as React from "react";
import {connect} from "react-redux";

import FilmCard from "../film-card/film-card";
import {getFilterFilms} from "../../reducer/movie/selectors.js";
import {IFilm} from "../../types";
import {Operation} from "../../reducer/movie/movie.js";


interface IProps {
  currentLength: number;
  excludeFilmId?: string;
  favoriteFilms: IFilm[];
  films: IFilm[];
  fiteredGenres?: string[];
  limit?: number;
  onLoadFavoriteFilms: () => Promise<void>;
  onClick: (films: IFilm) => void;
  onMoreButtonClick: () => void;
  onResetCurrentLength: () => void;
  useAllFilms: boolean;
}

class MoviesList extends React.PureComponent<IProps, null> {
  private get buttonShowMore(): React.ReactElement {
    const {
      films,
      currentLength = films.length,
      onMoreButtonClick,
      useAllFilms
    } = this.props;

    return (
      useAllFilms ? (
        <div className={`catalog__more ${currentLength >= films.length ? `visually-hidden` : ``}`}>
          <button onClick={onMoreButtonClick} className="catalog__button" type="button">Show more</button>
        </div>
      ) : (
        <></>
      )
    );
  }

  private get filmsList(): React.ReactElement[] {
    const {
      excludeFilmId,
      favoriteFilms,
      films,
      fiteredGenres,
      limit,
      onClick,
      useAllFilms,
      currentLength = films.length
    } = this.props;

    const list = useAllFilms ? films : favoriteFilms;
    const filmsLimit = limit ? limit : currentLength;

    return list
      .filter(({id, genre}): boolean => {
        if (id === excludeFilmId) {
          return false;
        }
        if (!fiteredGenres) {
          return true;
        }
        return genre
          .some((item): boolean => fiteredGenres
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

  public constructor(props) {
    super(props);
  }

  public render(): React.ReactElement {
    return (
      <>
        <div className="catalog__movies-list">
          {this.filmsList}
        </div>
        {this.buttonShowMore}
      </>
    );
  }

  public componentDidMount(): void {
    const {useAllFilms, onLoadFavoriteFilms} = this.props;
    if (!useAllFilms) {
      onLoadFavoriteFilms();
    }
  }

  public componentDidUpdate(oldProps: IProps): void {
    const {films, onResetCurrentLength} = this.props;

    if (films.length !== oldProps.films.length) {
      onResetCurrentLength();
    }
  }
}

const mapDispatchToProps = (dispatch): object => ({
  onLoadFavoriteFilms: (): Promise<void> => dispatch(Operation.loadFavoriteFilms())
});

const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  films: getFilterFilms(state),
  favoriteFilms: state.movie.favoriteFilms
});

export {MoviesList};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
