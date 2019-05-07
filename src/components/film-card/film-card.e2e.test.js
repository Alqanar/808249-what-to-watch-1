import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FilmCard from "./film-card.jsx";

Enzyme.configure({adapter: new Adapter()});

const film = {
  name: `Avengers: Endgame`,
  link: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`
};

it(`Clicking on the card header will trigger a callback`, () => {
  const clickHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    movie={film}
    key={0}
    isActive={false}
    onClick={clickHandler}
  />);

  const cardHeaders = filmCard.find(`.small-movie-card__link`);


  cardHeaders.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(cardHeaders.length);
});
