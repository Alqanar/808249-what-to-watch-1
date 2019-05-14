import React from "react";

import MainPage from "../main-page/main-page.jsx";
import {
  featuredFilm,
  GENRES,
  avatarLink
} from "../../mocks/mock-data.js";
import {
  films
} from "../../mocks/films.js";

const App = () => {

  return (
    <MainPage
      avatarLink={avatarLink}
      featuredFilm={featuredFilm}
      genres={GENRES}
      moviesList={films}
    />
  );
};

export default App;
