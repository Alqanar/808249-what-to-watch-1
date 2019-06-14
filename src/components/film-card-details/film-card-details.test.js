import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import FilmCardDetails from "./film-card-details";
import history from "../../history.ts";


const avatarLink = `img/avatar.jpg`;

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

describe(`film card details correctly renders`, () => {
  it(`when isShort passed poster of the film renders at the up of the page and we aren't see navigation of the film card`, () => {
    const tree = renderer
      .create(<FilmCardDetails
        isShort
        avatarLink={avatarLink}
        film={movieMock}
        isAuth={true}
        className={`movie-card__info`}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when isShort not passed poster of the film renders at the middle of the page and we are seeing navigation of the film card, flag of the need review added button '+ Add review'`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <FilmCardDetails
            avatarLink={avatarLink}
            isAuth={true}
            needVanish
            needReview
            film={movieMock}
          />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
