import * as React from "react";
import {connect} from "react-redux";

import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import FilmImageBackground from "../film-image-background/film-image-background";
import FilmPoster from "../film-poster/film-poster";
import Logo from "../logo/logo";
import Sprite from "../sprite/sprite";
import UserBlock from "../user-block/user-block";

import history from "../../history";
import {Operation} from "../../reducer/reviews/reviews.js";
import {IFilm} from "../../types";


interface IProps {
  avatarLink: string;
  film: IFilm;
  isAuth: boolean;
  isDisable: boolean;
  isDisableButton: boolean;
  onDisableChange: () => void;
  onSendReview: (id: string, {rating: number, comment: string}) => Promise<void>;
  onTextareaChange: () => void;
}

const getStar = (i: number, isDisable: boolean): React.ReactElement => (
  <React.Fragment key={i}>
    <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={`${i}`} defaultChecked={i === 3} disabled={isDisable}/>
    <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
  </React.Fragment>
);

const getStarList = (isDisable: boolean): React.ReactElement[] =>{
  const stars = [];
  for (let i = 1; i < 6; i++) {
    stars.push(getStar(i, isDisable));
  }
  return stars;
};

class AddReviewPage extends React.PureComponent<IProps, null> {
  private formRef = React.createRef<HTMLFormElement>();

  public constructor(props) {
    super(props);

    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }

  public render(): React.ReactElement {
    const {
      avatarLink,
      isAuth,
      film,
      onTextareaChange,
      isDisable,
      isDisableButton
    } = this.props;

    if (!film) {
      return <div></div>;
    }

    return (
      <>
        <Sprite />
        <section className="movie-card movie-card--full" style={{background: film.backgroundColor}}>
          <div className="movie-card__header">
            <FilmImageBackground
              film={film}
            />
            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header">
              <Logo
                hrefLink='/'
              />
              <Breadcrumbs
                film={film}
              />
              <UserBlock
                avatarLink={avatarLink}
                isAuth={isAuth}
              />
            </header>
            <FilmPoster
              name={film.name}
              posterImage={film.posterImage}
              size="S"
            />
          </div>
          <div className="add-review">
            <form
              onSubmit={this.handleReviewSubmit}
              ref={this.formRef}
              action="#"
              className="add-review__form"
            >
              <div className="rating">
                <div className="rating__stars">
                  {getStarList(isDisable)}
                </div>
              </div>
              <div className="add-review__text" style={{background: `#ffffff`}}>
                <textarea
                  className="add-review__textarea"
                  name="review-text"
                  id="review-text"
                  placeholder="Review text"
                  autoFocus
                  onChange={onTextareaChange}
                  disabled={isDisable}
                >
                </textarea>
                <div className="add-review__submit">
                  <button className="add-review__btn" type="submit" disabled={isDisable || isDisableButton}>Post</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }

  private handleReviewSubmit(event): void {
    const formData = new FormData(this.formRef.current);
    const reviewData = {
      rating: Number(formData.get(`rating`)),
      comment: String(formData.get(`review-text`))
    };
    const reviewLength = reviewData.comment.length;
    const {film: {id}, onSendReview, onDisableChange} = this.props;

    event.preventDefault();

    if (id && reviewLength >= 50 && reviewLength <= 400) {
      onDisableChange();
      onSendReview(id, reviewData)
        .then((): void => {
          history.push(`/film/${id}`);
        })
        .catch((): void => onDisableChange());
    }
  }
}

const mapDispatchToProps = (dispatch): object => ({
  onSendReview: (id, object): Promise<void> => dispatch(Operation.sendReview(id, object))
});

export {AddReviewPage};

export default connect(null, mapDispatchToProps)(AddReviewPage);
