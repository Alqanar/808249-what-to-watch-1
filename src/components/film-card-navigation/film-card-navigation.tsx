import * as React from "react";
import {Route, NavLink} from "react-router-dom";

import DetailsTab from "../details-tab/details-tab";
import OverviewTab from "../overview-tab/overview-tab";
import ReviewsTab from "../reviews-tab/reviews-tab";
import {IFilm} from "../../types";

const NAVIGATION_FIELDS = [
  {
    link: ``,
    name: `Overview`
  },
  {
    link: `details`,
    name: `Details`
  },
  {
    link: `reviews`,
    name: `Reviews`
  }
];


interface IProps {
  film: IFilm;
}

const createNavigationItem = (id: string, link: string, name: string): React.ReactElement => {
  return (
    <li className="movie-nav__item" key={link + name}>
      <NavLink
        to={`/film/${id}/${link}`}
        className="movie-nav__link"
        activeClassName="movie-nav__item--active"
      >
        {name}
      </NavLink>
    </li>
  );
};

class FilmCardNavigation extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.renderOverviewTab = this.renderOverviewTab.bind(this);
    this.renderDetailsTab = this.renderDetailsTab.bind(this);
    this.renderReviewsTab = this.renderReviewsTab.bind(this);
  }

  public render(): React.ReactElement {
    const {film} = this.props;

    const navigationList = NAVIGATION_FIELDS.map(({link, name}): React.ReactElement =>
      createNavigationItem(film.id, link, name)
    );

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {navigationList}
          </ul>
        </nav>
        <Route path="/film/:id/" exact render={this.renderOverviewTab} />
        <Route path="/film/:id/details" render={this.renderDetailsTab} />
        <Route path="/film/:id/reviews" render={this.renderReviewsTab} />
      </div>
    );
  }

  private renderDetailsTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <DetailsTab
        film={film}
      />
    );
  }

  private renderOverviewTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <OverviewTab
        film={film}
      />
    );
  }

  private renderReviewsTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <ReviewsTab
        film={film}
      />
    );
  }
}

export default FilmCardNavigation;
