import React from "react";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";

import createAPI from "../../api.js";
import MyListPage from "./my-list-page.tsx";
import history from "../../history.ts";


const moviesListMock = [
  {
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
    famousActors: [`Keira Knightley`, `Ned Wills`, `Pandora Colin`],
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
  },
  {
    backgroundColor: `#B9B27E`,
    coverLink: `https://m.media-amazon.com/images/M/MV5BOGJlZGY0ZTAtNjcwMy00ODQ5LTgzNjEtOTZkNmMxNzhhY2U0XkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SY1000_CR0,0,1499,1000_AL_.jpg`,
    description: `Professor James Murray begins work compiling words for the first edition of the Oxford English Dictionary in the mid 19th century, and receives over 10,000 entries from a patient at Broadmoor Criminal Lunatic Asylum, Dr. William Minor.`,
    director: `Farhad Safinia`,
    genre: [`Biography`, `Drama`, `Mystery`, `Thriller`],
    id: `1`,
    favorite: false,
    name: `The Professor and the Madman`,
    posterImage: `https://m.media-amazon.com/images/M/MV5BNjRjNWIxMWMtNzcxYi00NDYyLWFmMzAtZTRiZWZhZDMwZmVkXkEyXkFqcGdeQXVyMjExMDE1MzQ@._V1_SY1000_CR0,0,699,1000_AL_.jpg`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_996027.jpg`,
    trailer: `https://youtu.be/FPv3e2FZOgo`,
    rating: 7.4,
    released: 2019,
    duration: 124,
    scoresCount: 10699,
    famousActors: [`Natalie Dormer`, `Mel Gibson`, `Sean Penn`],
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
  },
  {
    backgroundColor: `#c4efd2`,
    coverLink: `https://m.media-amazon.com/images/M/MV5BODdlNWU5ZDgtMmNhMS00MTVjLTk1ZTAtZWJkYjg1MjBmNTRiXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    description: `A pair of teenagers with cystic fibrosis meet in a hospital and fall in love, though their disease means they must avoid close physical contact.`,
    director: `Justin Baldoni`,
    genre: [`Drama`, `Ronamnce`],
    id: `2`,
    favorite: false,
    name: `Five Feet Apart`,
    posterImage: `https://m.media-amazon.com/images/M/MV5BNzVmMjJlN2MtNWQ4Ny00Zjc2LWJjYTgtYjJiNGM5MTM1ZTlkXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SY1000_SX675_AL_.jpg`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1151373.jpg`,
    trailer: `https://youtu.be/XtgCqMZofqM`,
    rating: 7.2,
    released: 2019,
    duration: 116,
    scoresCount: 11321,
    famousActors: [`Haley Lu Richardson`, `Cole Sprouse`, `Moises Arias`],
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
  }
];

const testInitialState = () => {
  return ({
    movie: {
      genre: `All genres`,
      films: moviesListMock,
      favoriteFilms: moviesListMock
    }
  });
};

const dispatch = jest.fn();
const api = createAPI(dispatch);

const store = createStore(
  testInitialState,
  applyMiddleware(
    thunk.withExtraArgument(api)
  )
);

it(`My list page correctly renders`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router history={history}>
          <MyListPage
            avatarLink="img/avatar.jpg"
            isAuth={false}
          />
        </Router>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
