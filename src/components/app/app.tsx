import * as React from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";

import FavouritePage from "../favourite-page/favourite-page";
import MainPage from "../main-page/main-page";
import FilmPage from "../film-page/film-page";
import SignInPage from "../sign-in-page/sign-in-page";

import composedWithPrivateRoute from "../../hocs/with-private-route";
import history from "../../history";
import withAuthorizationState from "../../hocs/with-authorization-state";
import {getGenresList} from "../../reducer/movie/selectors.js";
import {IFilm} from "../../types.js";
import {featuredFilm} from "../../mocks/mock-data.js";
import {Operation, ActionCreator} from "../../reducer/authorization/authorization.js";


interface IProps {
  avatarLink: string;
  genresList: string[];
  reseteNeedAuth: () => void;
  signIn: (email: string, pass: string) => Promise<void>;
  userId: string;
  allFilms: IFilm[];
}

const SignInPageWrapped = withAuthorizationState(SignInPage);
const FavouritePageWrapped = composedWithPrivateRoute(FavouritePage);

class App extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.goToFilmPage = this.goToFilmPage.bind(this);
    this.renderMainPage = this.renderMainPage.bind(this);
    this.renderSignInPage = this.renderSignInPage.bind(this);
    this.renderFavouritePage = this.renderFavouritePage.bind(this);
    this.renderFilmPage = this.renderFilmPage.bind(this);
  }

  public render(): React.ReactElement {
    return (
      <Switch>
        <Route path="/" exact render={this.renderMainPage} />
        <Route path="/login" render={this.renderSignInPage} />
        <Route path="/favorites" render={this.renderFavouritePage} />
        <Route path="/film/:id" render={this.renderFilmPage} />
      </Switch>
    );
  }

  private goToFilmPage(movieCard: IFilm): void {
    history.push(`/film/${movieCard.id}`);
  }

  private renderFavouritePage(): React.ReactElement {
    const {
      avatarLink,
      userId
    } = this.props;

    return (
      <FavouritePageWrapped
        avatarLink={avatarLink}
        isAuth={Boolean(userId)}
        onClick={this.goToFilmPage}
      />
    );
  }

  private renderFilmPage({match: {params: {id}}}): React.ReactElement {
    const {
      avatarLink,
      userId
    } = this.props;

    return (
      <FilmPage
        avatarLink={avatarLink}
        film={this.getChosenFilm(id)}
        isAuth={Boolean(userId)}
        onClick={this.goToFilmPage}
      />
    );
  }

  private renderMainPage(): React.ReactElement {
    const {
      avatarLink,
      userId,
      genresList
    } = this.props;

    return (
      <MainPage
        avatarLink={avatarLink}
        featuredFilm={featuredFilm}
        genres={genresList}
        onClick={this.goToFilmPage}
        isAuth={Boolean(userId)}
      />
    );
  }

  private renderSignInPage(): React.ReactElement {
    const {signIn, reseteNeedAuth} = this.props;

    return (
      <SignInPageWrapped
        onSignInButtonClick={signIn}
        onMount={reseteNeedAuth}
      />
    );
  }

  private getChosenFilm(filmId: string): IFilm {
    const {allFilms} = this.props;
    return allFilms.find((film: IFilm): boolean => film.id === filmId);
  }
}

const mapDispatchToProps = (dispatch): object => ({
  signIn: (email, pass): Promise<void> => dispatch(Operation.requestAuthorization(email, pass)),
  resetNeedAuth: (): void => dispatch(ActionCreator.setNeedAuth(false))
});

const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  avatarLink: state.authorization.user.avatarUrl,
  userId: state.authorization.user.id,
  genresList: getGenresList(state),
  allFilms: state.movie.films
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
