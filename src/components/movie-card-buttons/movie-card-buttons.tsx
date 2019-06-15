import * as React from "react";

import PlayButton from "../play-button/play-button";
import MyListButton from "../my-list-button/my-list-button";

interface IProps {
  needReview?: boolean;
}

const MovieCardButtons: React.FC<IProps> = (props): React.ReactElement => {
  const {needReview} = props;

  return (
    <div className="movie-card__buttons">
      <PlayButton />
      <MyListButton />

      {needReview && (
        <a href="add-review.html" className="btn movie-card__button">Add review</a>
      )}
    </div>
  );
};

export default MovieCardButtons;
