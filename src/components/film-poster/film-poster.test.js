import React from "react";
import renderer from "react-test-renderer";

import FilmPoster from "./film-poster.tsx";


describe(`Poster of the film correctly renders`, () => {
  it(`when isBig not passed div render with class 'movie-card__poster'`, () => {
    const tree = renderer
      .create(<FilmPoster
        name={`Avengers: Endgame`}
        posterLink={`https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when size L div render with classes 'movie-card__poster' and 'movie-card__poster--big'`, () => {
    const tree = renderer
      .create(<FilmPoster
        name={`Avengers: Endgame`}
        posterLink={`https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`}
        size="L"
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when size S div render with classes 'movie-card__poster' and 'movie-card__poster--small'`, () => {
    const tree = renderer
      .create(<FilmPoster
        name={`Avengers: Endgame`}
        posterLink={`https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`}
        size="S"
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
