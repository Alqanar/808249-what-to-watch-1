import * as React from "react";
import {Link} from "react-router-dom";

import PlayButton from "../play-button/play-button";
import MyListButton from "../my-list-button/my-list-button";

interface IProps {
  id?: string;
  needReview?: boolean;
  onPlayButtonClick: () => void;
}

const MovieCardButtons: React.FC<IProps> = (props): React.ReactElement => {
  const {id, needReview, onPlayButtonClick} = props;

  return (
    <div className="movie-card__buttons">
      <PlayButton
        onPlayButtonClick={onPlayButtonClick}
      />
      <MyListButton />

      {needReview && (
        <Link to={`/film/${id}/review`} className="btn movie-card__button">Add review</Link>
      )}
    </div>
  );
};

export default MovieCardButtons;
