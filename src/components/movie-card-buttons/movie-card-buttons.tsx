import * as React from "react";
import {Link} from "react-router-dom";

import PlayButton from "../play-button/play-button";
import MyListButton from "../my-list-button/my-list-button";
import withDisableState from "../../hocs/with-disable-state";


const MyListButtonWrapped = withDisableState(MyListButton);

interface IProps {
  favorite: boolean;
  id: string;
  needReview?: boolean;
  onPlayButtonClick: () => void;
}

const MovieCardButtons: React.FC<IProps> = (props): React.ReactElement => {
  const {id, needReview, onPlayButtonClick, favorite} = props;

  return (
    <div className="movie-card__buttons">
      <PlayButton
        onPlayButtonClick={onPlayButtonClick}
      />
      <MyListButtonWrapped
        favorite={favorite}
        id={id}
      />

      {needReview && (
        <Link to={`/film/${id}/review`} className="btn movie-card__button">Add review</Link>
      )}
    </div>
  );
};

export default MovieCardButtons;
