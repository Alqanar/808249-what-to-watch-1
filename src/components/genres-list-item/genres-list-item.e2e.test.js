import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenresListItem from "./genres-list-item.jsx";


Enzyme.configure({adapter: new Adapter()});

const name = `Sci-Fi`;
const filmGenre = `Fantasy`;

it(`Clicking on the genre will trigger a callback`, () => {
  const handleGenreClick = jest.fn();
  const genresListItem = shallow(<GenresListItem
    name={name}
    onGenreClick={handleGenreClick}
    isActive={false}
    filmGenre={filmGenre}
  />);

  const genre = genresListItem.find(`.catalog__genres-link`);


  genre.simulate(`click`, {preventDefault() {}});

  expect(handleGenreClick).toHaveBeenCalledTimes(1);
});


it(`Clicking on the genre will transfer the active name of the genre`, () => {
  const handleGenreClick = jest.fn();
  const genresListItem = shallow(<GenresListItem
    name={name}
    onGenreClick={handleGenreClick}
    isActive={false}
    filmGenre={filmGenre}
  />);

  const genre = genresListItem.find(`.catalog__genres-link`);

  genre.simulate(`click`, {preventDefault() {}});

  expect(handleGenreClick).toHaveBeenCalledWith(filmGenre);
});
