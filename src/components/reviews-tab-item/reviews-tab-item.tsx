import * as React from "react";

import {IReview} from "../../types";
import {getDateTime, getDate} from "../../utility";


interface IProps {
  review: IReview;
}

const ReviewsTabItem: React.FC<IProps> = (props): React.ReactElement => {
  const {review: {comment, user: {name}, date, rating}} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={getDateTime(date)}>{getDate(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

export default ReviewsTabItem;
