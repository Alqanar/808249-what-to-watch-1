import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { compose } from "recompose";
import logger from 'redux-logger';
import { BrowserRouter } from "react-router-dom";

import App from "./components/app/app";
import reducer from "./reducer/reducer.js";
import { Operation } from "./reducer/movie/movie.js";
import createAPI from "./api.js";


declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const api = createAPI(() => history.pushState(null, null, `/login`));

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      logger,
      thunk.withExtraArgument(api)
    ),
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.dispatch(Operation.loadFilms());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById(`root`)
);
