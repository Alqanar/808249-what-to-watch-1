import * as React from "react";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/movie/movie.js";
import GenreListItem from "../genres-list-item/genres-list-item";


interface IProps {
    genres: string[];
    activeGenre: string;
    onSetGenre: (clickedGenre: string) => Promise<void>;
}

class GenresList extends React.PureComponent<IProps, null> {
    public constructor(props) {
        super(props);
    }

    public render(): React.ReactElement {
        const {genres, activeGenre, onSetGenre} = this.props;

        const genresList = genres.map((name, i): React.ReactElement =>
            <GenreListItem
                name={name}
                key={i}
                isActive={activeGenre === name}
                onGenreClick={onSetGenre}
            />);

        return (
            <ul className="catalog__genres-list">
                {genresList}
            </ul>
        );
    }
}

const mapStateToProps = (state, ownProps): void => ({
    ...ownProps,
    activeGenre: state.movie.genre
});

const mapDispatchToProps = (dispatch): object => ({
    onSetGenre: (clickedGenre): void => dispatch(ActionCreator.setGenre(clickedGenre))
});

export {GenresList};

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
