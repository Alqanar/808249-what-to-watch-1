import React from "react";
import renderer from "react-test-renderer";

import FilmDetailedCard from "./film-detailed-card.tsx";

const movieMock = {
  backgroundColor: `#ffffff`,
  coverLink: `https://m.media-amazon.com/images/M/MV5BNmE1ZGI2ZDctZDQxNC00MmRkLWJkYTQtNmY3YmI5MzlhOTVkXkEyXkFqcGdeQXVyMjc1NDA2OA@@._V1_SY1000_CR0,0,1498,1000_AL_.jpg`,
  description: `Post World War II, a British colonel and his wife are assigned to live in Hamburg during the post-war reconstruction, but tensions arise with the German who previously owned the house.`,
  director: `James Kent`,
  genre: [`Drama`, `Romance`, `War`],
  id: `0`,
  favorite: false,
  name: `The Aftermath`,
  posterImage: `https://m.media-amazon.com/images/M/MV5BMTk2MDEyNTE5M15BMl5BanBnXkFtZTgwMzY1NDM4NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`,
  trailer: `https://youtu.be/FPv3e2FZOgo`,
  rating: 6.3,
  released: 2019,
  duration: 108,
  scoresCount: 2726,
  starring: [`Keira Knightley`, `Ned Wills`, `Pandora Colin`],
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
};

describe(`Featured film card correctly renders`, () => {
  it(`when needVanish not passed renders div wrapper`, () => {
    const tree = renderer
      .create(<FilmDetailedCard
        film={movieMock}
        className={`movie-card__info`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when needVanish not passed renders without wrapper`, () => {
    const tree = renderer
      .create(<FilmDetailedCard
        film={movieMock}
        needVanish
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
