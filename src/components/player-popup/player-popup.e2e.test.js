import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PlayerPopup from "./player-popup.tsx";


Enzyme.configure({adapter: new Adapter()});

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
  famousActors: [`Keira Knightley`, `Ned Wills`, `Pandora Colin`],
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
};

describe(`Player popup works correctly`, () => {
  it(`click on the button of fullscreen will trigger a callback`, () => {
    const handleFullScreenEnter = jest.fn();
    const playerPopup = mount(<PlayerPopup
      film={movieMock}
    />);

    const buttonFullScreen = playerPopup.find(`.player__full-screen`);

    playerPopup.instance().videoRef.current.requestFullscreen = handleFullScreenEnter;

    buttonFullScreen.simulate(`click`, {preventDefault() {}});

    expect(handleFullScreenEnter).toHaveBeenCalledTimes(1);
  });

  it(`click on the button play or pause will trigger a callback`, () => {
    const handleSwitchPausePlay = jest.fn();
    const playVideo = jest.fn();
    const playerPopup = mount(<PlayerPopup
      film={movieMock}
      onSwitchPausePlay={handleSwitchPausePlay}
    />);

    playerPopup.instance().videoRef.current.play = playVideo;

    const buttonControlFilm = playerPopup.find(`.player__play`);

    buttonControlFilm.simulate(`click`, {preventDefault() {}});

    expect(handleSwitchPausePlay).toHaveBeenCalledTimes(1);
  });
});
