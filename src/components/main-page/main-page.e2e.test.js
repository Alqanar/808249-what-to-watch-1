import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainPage from "./main-page.tsx";

Enzyme.configure({adapter: new Adapter()});


import {
  featuredFilmMock,
  genresMock
} from "./test-mock-data.js";

it(`Clicking on the card header will trigger a callback`, () => {
  const clickHandler = jest.fn();
  const mainPage = shallow(<MainPage
    avatarLink='img/avatar.jpg'
    featuredFilm={featuredFilmMock}
    genres={genresMock}
    onClick={clickHandler}
    isAuth={false}
  />);

  const cardHeaders = mainPage.find(`.small-movie-card__link`);


  for (let i = 0; i < cardHeaders.length; i++) {
    cardHeaders.at(i).simulate(`click`, {preventDefault() {}});
  }

  expect(clickHandler).toHaveBeenCalledTimes(cardHeaders.length);
});
