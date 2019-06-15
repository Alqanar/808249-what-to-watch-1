import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import FilmCard from "./film-card.tsx";


Enzyme.configure({adapter: new Adapter()});

const film = {
  id: `0`,
  name: `Avengers: Endgame`,
  posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
  trailer: `https://youtu.be/TcMBFSGVi1c`
};

it(`Clicking on the card will trigger a callback`, () => {
  const clickHandler = jest.fn();
  const filmCard = shallow(<FilmCard
    movie={film}
    key={0}
    onClick={clickHandler}
    useAllFilms={true}
  />);

  const card = filmCard.find(`.catalog__movies-card`);


  card.simulate(`click`, {preventDefault() {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
