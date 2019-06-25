import * as React from 'react';
import {connect} from "react-redux";

import {Operation} from "../../reducer/movie/movie.js";
import history from "../../history";


interface IProps {
  id: string;
  favorite: boolean;
  hasAuth: boolean;
  isDisable: boolean;
  onDisableChange: () => void;
  onSendFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}

const iconNotFavorite = (): React.ReactElement => (
  <svg viewBox="0 0 19 20" width="19" height="20">
    <use xlinkHref="#add" />
  </svg>
);

const iconFavorite = (): React.ReactElement => (
  <svg viewBox="0 0 18 14" width="18" height="14">
    <use xlinkHref="#in-list"></use>
  </svg>
);

class MyListButton extends React.PureComponent<IProps, null> {
  public constructor(props) {
    super(props);

    this.handleMyListButtonClick = this.handleMyListButtonClick.bind(this);
  }

  public render(): React.ReactElement {
    const {favorite, isDisable} = this.props;

    return (
      <button
        onClick={this.handleMyListButtonClick}
        className="btn btn--list movie-card__button"
        type="button"
        disabled={isDisable}
      >
        {favorite ? iconFavorite() : iconNotFavorite()}
        <span>My list</span>
      </button>
    );
  }

  private handleMyListButtonClick(event): void {
    const {id, favorite, hasAuth, onDisableChange, onSendFavoriteStatus} = this.props;

    event.preventDefault();
    onDisableChange();

    if (!hasAuth) {
      history.push(`/login`);
    } else {
      onSendFavoriteStatus(id, favorite)
        .then((): void => onDisableChange())
        .catch((): void => onDisableChange());
    }
  }
}

const mapDispatchToProps = (dispatch): object => ({
  onSendFavoriteStatus: (id, favorite): Promise<void> => dispatch(Operation.sendFavoriteStatus(id, !favorite))
});

const mapStateToProps = (state, ownProps): void => ({
  ...ownProps,
  hasAuth: Boolean(state.authorization.user.id)
});

export {MyListButton};

export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
