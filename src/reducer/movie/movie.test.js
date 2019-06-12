import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";

import transformFilmObject from "../../transformFilmObject.js";
import {
    ActionCreator,
    ActionType,
    reducer,
    Operation
} from "./movie.js";


const filmFromServer = {
    'background_color': `#A39E81`,
    'background_image': `https://es31-server.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg`,
    'description': `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
    'director': `Jemaine Clement`,
    'genre': `Comedy`,
    'id': 1,
    'is_favorite': false,
    'name': `What We Do in the Shadows`,
    'poster_image': `https://es31-server.appspot.com/wtw/static/film/poster/What-We-Do-in-the-Shadows.jpg`,
    'preview_image': `https://es31-server.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    'preview_video_link': `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    'rating': 8.4,
    'released': 2019,
    'run_time': 30,
    'scores_count': 6173,
    'starring': [`Kayvan Novak`, `Matt Berry`, `Natasia Demetriou`],
    'video_link': `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
};


it(`Action creator for set genre returns correct action`, () => {
    expect(ActionCreator.setGenre(`Sci-Fi`)).toEqual({
        type: ActionType.SET_GENRE,
        payload: `Sci-Fi`,
    });
});


describe(`Reducer works correctly`, () => {
    it(`Without additional parameters should return initial state`, () => {
        expect(reducer(undefined, {})).toEqual({
            genre: `All genres`,
            films: []
        });
    });

    it(`Should make a correct API call to /films`, function () {
        const dispatch = jest.fn();
        const api = createAPI(dispatch);
        const apiMock = new MockAdapter(api);
        const filmsLoader = Operation.loadFilms();

        apiMock
            .onGet(`/films`)
            .reply(200, [filmFromServer]);

        return filmsLoader(dispatch, undefined, api)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(dispatch).toHaveBeenNthCalledWith(1, {
                    type: ActionType.SET_FILMS,
                    payload: [transformFilmObject(filmFromServer)],
                });
            });
    });
});
