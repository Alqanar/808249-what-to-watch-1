import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from "./video-player.tsx";


const film = {
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
    trailer: `https://youtu.be/TcMBFSGVi1c`
};

it(`Video player is correctly renders`, () => {
    const tree = renderer
        .create(<VideoPlayer
            film={film}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
