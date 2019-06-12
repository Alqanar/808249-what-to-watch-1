import React from "react";
import renderer from "react-test-renderer";

import FeaturedFilmCard from "./featured-film-card.tsx";

const featuredFilm = {
    name: `Avengers: Endgame`,
    posterLink: `https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg`,
    genre: [`Sci-Fi`],
    released: `2019`
};

it(`Movie card ifo correctly renders`, () => {
    const tree = renderer
        .create(<FeaturedFilmCard
            featuredFilm={featuredFilm}
        />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});
