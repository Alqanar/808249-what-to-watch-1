import React from "react";
import renderer from "react-test-renderer";

import FilmCard from "./film-card.tsx";


const film = {
    id: `0`,
    name: `Avengers: Endgame`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
    trailer: `https://youtu.be/TcMBFSGVi1c`
};

describe(`Film card correctly renders`, () => {
    it(`when isMainPage true`, () => {
        const tree = renderer
            .create(<FilmCard
                movie={film}
                key={0}
                isMainPage={true}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isMainPage false`, () => {
        const tree = renderer
            .create(<FilmCard
                movie={film}
                key={0}
                isMainPage={false}
            />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
