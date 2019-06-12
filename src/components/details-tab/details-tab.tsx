import * as React from "react";

import {IFilm} from "../../types";


const MINUTES_IN_HOUR = 60;

interface IProps {
  film: IFilm;
}

const detailsItem = (parameter: string, value: React.ReactElement): React.ReactElement => (
  <p className="movie-card__details-item">
    <strong className="movie-card__details-name">{parameter}</strong>
    <span className="movie-card__details-value">{value}</span>
  </p>
);

const convertTime = (minutes: number): string => {
  if (minutes >= MINUTES_IN_HOUR) {
    return `${Math.floor(minutes / MINUTES_IN_HOUR)}h ${minutes % MINUTES_IN_HOUR}m`;
  }
  return `0h ${minutes}m`;
};

const DetailsTab: React.FC<IProps> = (props): React.ReactElement => {
  const {film: {director, starring, duration, genre, released}} = props;

  const starList = starring.map((name): React.ReactElement => (
      <>
        {`${name},`}
        <br />
      </>
  ));

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        {detailsItem(`Director`, <>{director}</>)}
        {detailsItem(`Starring`, <>{starList}</>)}
      </div>
      <div className="movie-card__text-col">
        {detailsItem(`Run Time`, <>{convertTime(duration)}</>)}
        {detailsItem(`Genre`, <>{genre.join(`, `)}</>)}
        {detailsItem(`Released`, <>{released}</>)}
      </div>
    </div>
  );
};

export default DetailsTab;
