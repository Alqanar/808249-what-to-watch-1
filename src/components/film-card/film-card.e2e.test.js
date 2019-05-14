import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FilmCard from "./film-card.jsx";

Enzyme.configure({adapter: new Adapter()});

const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  link: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`
};


it(`Clicking on the card will trigger a callback`, () => {
  const clickHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    movie={film}
    key={0}
    isActive={false}
    onClick={clickHandler}
  />);

  const card = filmCard.find(`.catalog__movies-card`);


  card.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
});


it(`Clicking on the card will transfer the active card`, () => {
  const clickHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    movie={film}
    key={0}
    isActive={false}
    onClick={clickHandler}
  />);

  const card = filmCard.find(`.catalog__movies-card`);

  card.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledWith(film);
});


it(`Hovering on the card will transfer the card id`, () => {
  const mouseEnterHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    movie={film}
    key={0}
    isActive={false}
    onMouseEnter={mouseEnterHandler}
  />);

  const card = filmCard.find(`.catalog__movies-card`);

  card.simulate(`mouseEnter`);

  expect(mouseEnterHandler).toHaveBeenCalledWith(film.id);
});
