import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import App from './components/app/app.jsx';
import {reducer} from "./reducer.js";
import {films} from "./mocks/films.js";

const store = createStore(
    reducer, {
      genre: `All genres`,
      films,
      filteredFilms: films
    },
    window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
