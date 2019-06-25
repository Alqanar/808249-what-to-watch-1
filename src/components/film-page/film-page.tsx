import * as React from "react";

import FilmCardDetails from "../film-card-details/film-card-details";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import {IFilm} from "../../types";


const X_COORD = 0;
const Y_COORD = 0;

const LIMIT_SIMILAR_FILMS = 4;

interface IProps {
  avatarLink: string;
  isAuth: boolean;
  film: IFilm;
  onClick: (film: IFilm) => void;
}

class FilmPage extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);
  }

  public render(): React.ReactElement {
    const {
      avatarLink,
      isAuth,
      film,
      onClick
    } = this.props;

    if (!film) {
      return <div></div>;
    }

    return (
      <>
      <FilmCardDetails
        avatarLink={avatarLink}
        isAuth={isAuth}
        needVanish
        needReview
        film={film}
      />
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList
            onClick={onClick}
            useAllFilms
            fiteredGenres={film.genre}
            limit={LIMIT_SIMILAR_FILMS}
            excludeFilmId={film.id}
          />
        </section>
        <Footer />
      </div>
    </>
    );
  }

  public componentDidMount(): void {
    if (window) {
      window[`scrollTo`](X_COORD, Y_COORD);
    }
  }

  public componentDidUpdate(): void {
    if (window) {
      window[`scrollTo`](X_COORD, Y_COORD);
    }
  }
}

export default FilmPage;
