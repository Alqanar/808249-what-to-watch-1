import * as React from 'react';

const MyListButton: React.FC = (): React.ReactElement => {
    return (
        <button className="btn btn--list movie-card__button" type="button">
            <svg viewBox="0 0 19 20" width="19" height="20">
                <use xlinkHref="#add" />
            </svg>
            <span>My list</span>
        </button>
    );
};

export default MyListButton;
