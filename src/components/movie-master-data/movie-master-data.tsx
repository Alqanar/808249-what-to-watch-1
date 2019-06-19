import * as React from "react";

import Modal from "../modal/modal";
import MovieCardButtons from "../movie-card-buttons/movie-card-buttons";
import PlayerPopup from "../player-popup/player-popup";
import withPlayer from "../../hocs/with-player";
import {IFilm} from "../../types";


interface IProps {
  film: IFilm;
  needReview?: boolean;
  isPlayerOpened: boolean;
  onPlayButtonClick: () => void;
  onExitButtonClick: () => void;
}

const PlayerPopupWrapped = withPlayer(PlayerPopup);

const MovieMasterData: React.FC<IProps> = (props): React.ReactElement => {
  const {
    film,
    needReview,
    isPlayerOpened,
    onPlayButtonClick,
    onExitButtonClick
  } = props;

  return (
    <>
      <div className="movie-card__desc">
        <h2 className="movie-card__title">{film.name}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{film.genre.join(`, `)}</span>
          <span className="movie-card__year">{film.released}</span>
        </p>

        <MovieCardButtons
          needReview={needReview}
          onPlayButtonClick={onPlayButtonClick}
        />
      </div>
      {isPlayerOpened && (
        <Modal>
          <PlayerPopupWrapped
            film={film}
            isPaused={false}
            onExit={onExitButtonClick}
          />
        </Modal>
      )}
    </>
  );
};

export default MovieMasterData;
