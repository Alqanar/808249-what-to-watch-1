import React, {PureComponent} from "react";

import MainPage from "../main-page/main-page.jsx";
import {
  featuredFilm,
  GENRES,
  avatarLink
} from "../../mocks/mock-data.js";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this._getMovieCard = this._getMovieCard.bind(this);
  }

  render() {
    return (
      <MainPage
        avatarLink={avatarLink}
        featuredFilm={featuredFilm}
        genres={GENRES}
        onClick={this._getMovieCard}
      />
    );
  }

  _getMovieCard(movieCard) {
    return movieCard;
  }
}

export default App;
