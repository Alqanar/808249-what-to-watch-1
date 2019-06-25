import * as React from "react";
import {connect} from "react-redux";

import {Operation} from "../../reducer/reviews/reviews.js";
import {IReview, IFilm} from "../../types";
import ReviewsTabItem from "../reviews-tab-item/reviews-tab-item";


interface IProps {
  film: IFilm;
  reviews: IReview[];
  loadReviews: (id: string) => Promise<void>;
}

const getReviewsColumn = (reviews: IReview[]): React.ReactElement => {
  const column = reviews.map((review, i): React.ReactElement =>
    <ReviewsTabItem
      review={review}
      key={i}
    />
  );

  return (
    <div className="movie-card__reviews-col">
      {column}
    </div>
  );
};

class ReviewsTab extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);
  }

  public render(): React.ReactElement {
    const {reviews} = this.props;

    const partOneReviews = reviews.splice(0, Math.ceil(reviews.length / 2));
    const partTwoReviews = reviews;

    return (
      <div className="movie-card__reviews movie-card__row">
        {getReviewsColumn(partOneReviews)}
        {getReviewsColumn(partTwoReviews)}
      </div>
    );
  }

  public componentDidMount(): void {
    const {film: {id}, loadReviews} = this.props;

    if (id) {
      loadReviews(id);
    }
  }
}

const mapDispatchToProps = (dispatch): object => ({
  loadReviews: (id): Promise<void> => dispatch(Operation.loadReviews(id))
});

const mapStateToProps = (state, ownProps): void => {
  let reviews = [];
  const reviewsById = state.reviews.comments[ownProps.film.id];
  if (reviewsById) {
    reviews = reviewsById.sort((reviewA, reviewB): number => (
      new Date(reviewB.date).getTime() - new Date(reviewA.date).getTime()
    ));
  }
  return {
    ...ownProps,
    reviews
  };
};


export {ReviewsTab};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsTab);
