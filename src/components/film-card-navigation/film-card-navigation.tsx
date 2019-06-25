import * as React from "react";
import {Route, Link} from "react-router-dom";

import DetailsTab from "../details-tab/details-tab";
import history from "../../history";
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

const createNavigationItem = (
  id: string,
  link: string,
  name: string,
  isActive: boolean
): React.ReactElement => {
  return (
    <li className={`movie-nav__item ${isActive ? `movie-nav__item--active` : ``}`} key={link + name}>
      <Link to={`/film/${id}/${link}`} className="movie-nav__link">
        {name}
      </Link>
    </li>
  );
};

const getActiveTab = (): string => {
  const knownLinks = NAVIGATION_FIELDS.some((item): boolean => item.link === history.location.pathname.split(`/`).pop());
  if (!knownLinks) {
    return ``;
  }
  return history.location.pathname.split(`/`).pop();
};

class FilmCardNavigation extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.renderOverviewTab = this.renderOverviewTab.bind(this);
    this.renderDetailsTab = this.renderDetailsTab.bind(this);
    this.renderReviewsTab = this.renderReviewsTab.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  public render(): React.ReactElement {
    return (
      <div className="movie-card__desc">
        <Route path="/film/:id/" exact render={this.renderOverviewTab} />
        <Route path="/film/:id/details" render={this.renderDetailsTab} />
        <Route path="/film/:id/reviews" render={this.renderReviewsTab} />
      </div>
    );
  }

  private renderTabs(): React.ReactElement {
    const {film} = this.props;
    const activeTab = getActiveTab();
    const navigationList = NAVIGATION_FIELDS.map(({link, name}): React.ReactElement =>
      createNavigationItem(film.id, link, name, activeTab === link)
    );

    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {navigationList}
        </ul>
      </nav>
    );
  }

  private renderDetailsTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <>
        {this.renderTabs()}

        <DetailsTab
          film={film}
        />
      </>
    );
  }

  private renderOverviewTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <>
        {this.renderTabs()}

        <OverviewTab
          film={film}
        />
      </>
    );
  }

  private renderReviewsTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <>
        {this.renderTabs()}

        <ReviewsTab
          film={film}
        />
      </>
    );
  }
}

export default FilmCardNavigation;
