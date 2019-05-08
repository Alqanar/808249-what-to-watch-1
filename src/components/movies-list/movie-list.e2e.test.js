import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieList from "./movie-list.jsx";

Enzyme.configure({adapter: new Adapter()});

const films = [
  {
    id: `0`,
    name: `The Aftermath`,
    imageLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_1000125.jpg`
  }
];

it(`Hovering on the card will change active state`, () => {
  const movieList = mount(<MovieList
    films={films}
  />);

  expect(movieList.state(`activeCardId`)).toEqual(null);

  const filmCard = movieList.find(`.catalog__movies-card`);

  filmCard.simulate(`mouseEnter`);

  expect(movieList.state(`activeCardId`)).toEqual(`0`);
});
