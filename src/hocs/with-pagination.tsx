import * as React from "react";

import {IFilm} from "../types";


const DEFAULT_PAGE_SIZE = 20;

interface IProps {
  pageSize?: number;
  useAllFilms: boolean;
  onClick: (films: IFilm) => void;
  fiteredGenre?: string[];
  limit?: number;
  excludeFilmId?: string;
}

interface IState {
  currentLength: number;
}

function withPagination<T>(Component: React.ComponentType<T>): React.ComponentClass<IProps & T, IState> {

  class WithPagination extends React.PureComponent<IProps & T, IState> {
    public constructor(props) {
      super(props);

      this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this);
      this.resetCurrentLength = this.resetCurrentLength.bind(this);

      this.state = {
        currentLength: props.pageSize || DEFAULT_PAGE_SIZE
      };
    }

    public render(): React.ReactElement {
      const {currentLength} = this.state;

      return <Component
        {...this.props}
        onMoreButtonClick={this.handleMoreButtonClick}
        currentLength={currentLength}
        resetCurrentLength={this.resetCurrentLength}
      />;
    }

    private handleMoreButtonClick(event): void {
      const {currentLength} = this.state;
      const {pageSize = DEFAULT_PAGE_SIZE} = this.props;

      event.preventDefault();
      this.setState({
        currentLength: currentLength + pageSize
      });
    }

    private resetCurrentLength(): void {
      const {pageSize = DEFAULT_PAGE_SIZE} = this.props;

      this.setState({
        currentLength: pageSize
      });
    }

  }

  return WithPagination;
}

export default withPagination;
