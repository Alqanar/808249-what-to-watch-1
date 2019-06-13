import {combineReducers} from "redux";

import {reducer as authorization} from "./authorization/authorization.js";
import {reducer as movie} from "./movie/movie.js";
import {reducer as reviews} from "./reviews/reviews.js";


export default combineReducers({
  authorization,
  movie,
  reviews
});
