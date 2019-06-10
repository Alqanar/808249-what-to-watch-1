import {combineReducers} from "redux";

import {reducer as authorization} from "./authorization/authorization.js";
import {reducer as movie} from "./movie/movie.js";


export default combineReducers({
    authorization,
    movie
});
