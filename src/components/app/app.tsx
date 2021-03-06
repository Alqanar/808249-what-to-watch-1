import * as React from "react";
import {connect} from "react-redux";
import {Switch, Redirect, Route} from "react-router-dom";

import AddReviewPage from "../add-review-page/add-review-page";
import FilmPage from "../film-page/film-page";
import MainPage from "../main-page/main-page";
import MyListPage from "../my-list-page/my-list-page";
import SignInPage from "../sign-in-page/sign-in-page";

import composedWithPrivateRoute from "../../hocs/with-private-route";
import withAuthorizationState from "../../hocs/with-authorization-state";
import withCommentLimitation from "../../hocs/with-comment-limitation";
import withDisableState from "../../hocs/with-disable-state";

import history from "../../history";
import {getGenresList} from "../../reducer/movie/selectors.js";
import {IFilm} from "../../types.js";
import {Operation, ActionCreator} from "../../reducer/authorization/authorization.js";


interface IProps {
  allFilms: IFilm[];
  avatarLink: string;
  errorMessage: string;
  genresList: string[];
  promotedFilm: IFilm;
  onResetNeedAuth: () => void;
  onSignIn: (email: string, pass: string) => Promise<void>;
  userId: string;
}

const SignInPageWrapped = withAuthorizationState(SignInPage);
const MyListPageWrapped = composedWithPrivateRoute(MyListPage);
const AddReviewPageWrapped = composedWithPrivateRoute(withCommentLimitation(withDisableState(AddReviewPage)));

class App extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.goToFilmPage = this.goToFilmPage.bind(this);
    this.renderMainPage = this.renderMainPage.bind(this);
    this.renderSignInPage = this.renderSignInPage.bind(this);
    this.renderMyListPage = this.renderMyListPage.bind(this);
    this.renderFilmPage = this.renderFilmPage.bind(this);
    this.renderAddReviewPage = this.renderAddReviewPage.bind(this);
  }

  public render(): React.ReactElement {
    return (
      <Switch>
        <Route path="/" exact render={this.renderMainPage} />
        <Route path="/login" render={this.renderSignInPage} />
        <Route path="/mylist" render={this.renderMyListPage} />
        <Route path="/film/:id/review" render={this.renderAddReviewPage} />
        <Route path="/film/:id" render={this.renderFilmPage} />
      </Switch>
    );
  }

  private goToFilmPage(movieCard: IFilm): void {
    history.push(`/film/${movieCard.id}`);
  }

  private renderAddReviewPage({match: {params: {id}}}): React.ReactElement {
    const {
      avatarLink,
      userId
    } = this.props;
    return (
      <AddReviewPageWrapped
        film={this.getChosenFilm(id)}
        avatarLink={avatarLink}
        isAuth={Boolean(userId)}
      />
    );
  }

  private renderMyListPage(): React.ReactElement {
    const {
      avatarLink,
      userId
    } = this.props;

    return (
      <MyListPageWrapped
        avatarLink={avatarLink}
        isAuth={Boolean(userId)}
        onFilmCardClick={this.goToFilmPage}
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
        onFilmCardClick={this.goToFilmPage}
      />
    );
  }

  private renderMainPage(): React.ReactElement {
    const {
      avatarLink,
      userId,
      genresList,
      promotedFilm
    } = this.props;

    return (
      <MainPage
        avatarLink={avatarLink}
        featuredFilm={promotedFilm}
        genres={genresList}
        onFilmCardClick={this.goToFilmPage}
        isAuth={Boolean(userId)}
      />
    );
  }

  private renderSignInPage(): React.ReactElement {
    const {errorMessage, onSignIn, onResetNeedAuth, userId} = this.props;

    return userId ? (
      <Redirect to="/" />
    ) : (
      <SignInPageWrapped
        onSignInButtonClick={onSignIn}
        onMount={onResetNeedAuth}
        errorMessage={errorMessage}
      />
    );
  }

  private getChosenFilm(filmId: string): IFilm {
    const {allFilms} = this.props;
    return allFilms.find((film: IFilm): boolean => film.id === filmId);
  }
}

const mapDispatchToProps = (dispatch): object => ({
  onSignIn: (email, pass): Promise<void> => dispatch(Operation.requestAuthorization(email, pass)),
  onResetNeedAuth: (): void => dispatch(ActionCreator.setNeedAuth(false))
});

const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  avatarLink: state.authorization.user.avatarUrl,
  errorMessage: state.authorization.errorMessage,
  userId: state.authorization.user.id,
  allFilms: state.movie.films,
  genresList: getGenresList(state),
  promotedFilm: state.movie.promotedFilm
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
