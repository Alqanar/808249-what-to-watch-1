import * as React from "react";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";

import MainPage from "../main-page/main-page";
import SignInPage from "../sign-in-page/sign-in-page";
import withAuthorizationState from "../../hocs/with-authorization-state";
import FavouritePage from "../favourite-page/favourite-page";
import {Operation, ActionCreator} from "../../reducer/authorization/authorization.js";
import {getGenresList} from "../../reducer/movie/selectors.js";
import composedWithPrivateRoute from "../../hocs/with-private-route";
import {featuredFilm} from "../../mocks/mock-data.js";
import {IFilm} from "../../types.js";


interface IProps {
  avatarLink: string;
  genresList: string[];
  reseteNeedAuth: () => void;
  signIn: (email: string, pass: string) => Promise<void>;
  userId: string;
}

const SignInPageWrapped = withAuthorizationState(SignInPage);
const FavouritePageWrapped = composedWithPrivateRoute(FavouritePage);

class App extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.getMovieCard = this.getMovieCard.bind(this);
    this.renderMainPage = this.renderMainPage.bind(this);
    this.renderSignInPage = this.renderSignInPage.bind(this);
    this.renderFavouritePage = this.renderFavouritePage.bind(this);
    this.renderFilm = this.renderFilm.bind(this);
  }

  public render(): React.ReactElement {
    return (
      <Switch>
        <Route path="/" exact render={this.renderMainPage} />
        <Route path="/login" render={this.renderSignInPage} />
        <Route path="/favorites" render={this.renderFavouritePage} />
        <Route path="/film/:id" render={this.renderFilm} />
      </Switch>
    );
  }

  private getMovieCard(movieCard: IFilm): IFilm {
    return movieCard;
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
        onClick={this.getMovieCard}
      />
    );
  }

  private renderFilm(): React.ReactElement {
    const {signIn, reseteNeedAuth} = this.props;

    return (
      <SignInPageWrapped
        onSignInButtonClick={signIn}
        history={history}
        onMount={reseteNeedAuth}
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
        onClick={this.getMovieCard}
        isAuth={Boolean(userId)}
      />
    );
  }

  private renderSignInPage({history}): React.ReactElement {
    const {signIn, reseteNeedAuth} = this.props;

    return (
      <SignInPageWrapped
        onSignInButtonClick={signIn}
        history={history}
        onMount={reseteNeedAuth}
      />
    );
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
  genresList: getGenresList(state)
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
