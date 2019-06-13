import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {compose} from "recompose";
import logger from 'redux-logger';
import {Router} from "react-router-dom";

import App from "./components/app/app";
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/movie/movie.js";
import createAPI from "./api.js";
import {
  ActionCreator,
  Operation as AuthOperation
} from "./reducer/authorization/authorization.js";
import history from "./history";


let store;

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const api = createAPI((): void => store.dispatch(AuthOperation.invalidateUser()));

store = createStore(
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
store.dispatch(ActionCreator.restoreUser());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById(`root`)
);
