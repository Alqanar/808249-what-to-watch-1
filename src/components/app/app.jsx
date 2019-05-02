import React from "react";

import MainPage from '../main-page/main-page.jsx';
import {
  featuredFilm,
  GENRES,
  moviesList
} from './mock-data.js';

const App = () => {

  return (
    <MainPage
      featuredFilm={featuredFilm}
      genres={GENRES}
      moviesList={moviesList}
    />
  );
};

export default App;
