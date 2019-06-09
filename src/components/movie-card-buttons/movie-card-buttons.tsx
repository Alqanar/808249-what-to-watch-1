import * as React from "react";

import PlayButton from "../play-button/play-button"
import MyListButton from "../my-list-button/my-list-button"

const MovieCardButtons: React.FC = () => {
  return (
    <div className="movie-card__buttons">
      <PlayButton />
      <MyListButton />
    </div>
  );
};

export default MovieCardButtons;
