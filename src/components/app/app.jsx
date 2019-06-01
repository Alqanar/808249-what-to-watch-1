import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page.jsx";
import SignInPage from "../sign-in-page/sign-in-page.jsx";
import withAuthorizationState from "../../hocs/with-authorization-state.jsx";
import {Operation, ActionCreator} from "../../reducer/authorization/authorization.js";
import {
  featuredFilm,
  GENRES
} from "../../mocks/mock-data.js";


const SignInPageWrapped = withAuthorizationState(SignInPage);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._getMovieCard = this._getMovieCard.bind(this);
  }

  render() {
    const {
      isAuthorizationRequired,
      signIn,
      avatarLink,
      openedAuthPage,
      isAuthPage,
      userId
    } = this.props;

    return (
      isAuthorizationRequired || isAuthPage ?
        <SignInPageWrapped
          onSignInButtonClick={signIn}
        /> :
        <MainPage
          avatarLink={avatarLink}
          featuredFilm={featuredFilm}
          genres={GENRES}
          onClick={this._getMovieCard}
          isAuth={Boolean(userId)}
          moveToAuth={openedAuthPage}
        />
    );
  }

  _getMovieCard(movieCard) {
    return movieCard;
  }
}

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  avatarLink: PropTypes.string.isRequired,
  openedAuthPage: PropTypes.func.isRequired,
  isAuthPage: PropTypes.bool.isRequired,
  userId: PropTypes.number
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (email, pass) => dispatch(Operation.requestAuthorization(email, pass)),
  openedAuthPage: () => dispatch(ActionCreator.setAuthorizationPage(true))
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthorizationRequired: state.authorization.isAuthorizationRequired,
  avatarLink: state.authorization.user.avatarUrl,
  isAuthPage: state.authorization.isAuthPage,
  userId: state.authorization.user.id
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
