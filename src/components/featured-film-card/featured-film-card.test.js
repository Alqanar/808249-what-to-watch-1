import React from "react";
import renderer from "react-test-renderer";

import FeaturedFilmCard from "./featured-film-card.tsx";

const featuredFilm = {
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  genre: [`Sci-Fi`],
  released: `2019`
};

describe(`Featured film card correctly renders`, () => {
  it(`when needVanish not passed renders div wrapper`, () => {
    const tree = renderer
      .create(<FeaturedFilmCard
        featuredFilm={featuredFilm}
        className={`movie-card__info`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when needVanish not passed renders without wrapper`, () => {
    const tree = renderer
      .create(<FeaturedFilmCard
        featuredFilm={featuredFilm}
        needVanish
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
