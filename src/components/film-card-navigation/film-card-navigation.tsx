import * as React from "react";
import {Route, NavLink} from "react-router-dom";

import OverviewTab from "../overview-tab/overview-tab";
import DetailsTab from "../details-tab/details-tab";
import {IFilm} from "../../types";

const NAVIGATION_FIELDS = [
  {
    link: `/`,
    name: `Overview`
  },
  {
    link: `/details`,
    name: `Details`
  },
  {
    link: `/reviews`,
    name: `Reviews`
  }
]


interface IProps {
  film: IFilm;
}

const createNavigationItem = (link, name): React.ReactElement => {
  return (
    <li className="movie-nav__item" key={link + name}>
      <NavLink
        to={`/film/:id${link}`}
        activeClassName="movie-nav__item--active"
      >
        {name}
      </NavLink>
    </li>
  );
};

function Reviews ({match}) {
  return (
    <div>
      <h3>Reviews</h3>
    </div>
  );
}

class FilmCardNavigation extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.getMovieCard = this.getMovieCard.bind(this);
    this.renderOverviewTab = this.renderOverviewTab.bind(this);
    this.renderDetailsTab = this.renderDetailsTab.bind(this);
    this.renderFavouritePage = this.renderFavouritePage.bind(this);
  }

  public render(): React.ReactElement {
    const navigationList = NAVIGATION_FIELDS.map(({link, name}): React.ReactElement =>
      createNavigationItem(name, link)
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
        <Route path="/film/:id/reviews" component={Reviews} />
      </div>
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

  private renderDetailsTab(): React.ReactElement {
    const {film} = this.props;

    return (
      <DetailsTab
        film={film}
      />
    );
  }
}

export default FilmCardNavigation;
