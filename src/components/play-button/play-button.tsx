import * as React from "react";


interface IProps {
  onPlayButtonClick: () => void;
}

const PlayButton: React.FC<IProps> = (props): React.ReactElement => {
  const {onPlayButtonClick} = props;

  return (
    <button onClick={onPlayButtonClick} className="btn btn--play movie-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </button>
  );
};

export default PlayButton;
