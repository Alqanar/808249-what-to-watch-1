import React, {PureComponent} from "react";

import MainPage from "../main-page/main-page.jsx";
import {
  featuredFilm,
  GENRES,
  avatarLink
} from "../../mocks/mock-data.js";
import {
  films
} from "../../mocks/films.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  render() {
    return (
      <MainPage
        avatarLink={avatarLink}
        featuredFilm={featuredFilm}
        genres={GENRES}
        onClick={this._handleCardClick}
        moviesList={films}
      />
    );
  }

  _handleCardClick(movieCard) {
    return movieCard;
  }
}

export default App;
