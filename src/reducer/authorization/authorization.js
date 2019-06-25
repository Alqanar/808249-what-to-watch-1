const ERROR_LOGIN = 400;

const initialState = {
  user: {
    id: null,
    email: ``,
    name: ``,
    avatarUrl: ``
  },
  needAuth: false,
  errorMessage: ``
};

const ActionType = {
  EMPTY_ACTION: `EMPTY_ACTION`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  SET_USER: `SET_USER`,
  SET_NEED_AUTH: `SET_NEED_AUTH`,
  RESET: `RESET`
};

const ActionCreator = {

  executeEmptyAction: () => ({
    type: ActionType.EMPTY_ACTION
  }),

  reset: () => ({
    type: ActionType.RESET
  }),

  restoreUser: () => {
    if (localStorage) {
      const userData = localStorage.getItem(`user`);
      if (userData) {
        return ActionCreator.setUser(JSON.parse(userData));
      }
    }
    return ActionCreator.executeEmptyAction();
  },

  setErrorMessage: (error) => ({
    type: ActionType.SET_ERROR_MESSAGE,
    payload: error
  }),

  setNeedAuth: (flag) => ({
    type: ActionType.SET_NEED_AUTH,
    payload: flag
  }),

  setUser: (userObject) => ({
    type: ActionType.SET_USER,
    payload: {
      id: userObject.id,
      email: userObject.email,
      name: userObject.name,
      avatarUrl: `https://es31-server.appspot.com${userObject.avatar_url}`
    }
  })
};

const Operation = {
  invalidateUser: () => (dispatch) => {
    if (localStorage) {
      localStorage.removeItem(`user`);
    }
    dispatch(ActionCreator.reset());
    dispatch(ActionCreator.setNeedAuth(true));
  },

  requestAuthorization: (login, password) => (dispatch, _, api) => {
    dispatch(ActionCreator.setErrorMessage(``));
    return api.post(`/login`, {
      email: login,
      password
    })
      .then((response) => {
        if (response.code === `ECONNABORTED` || response.message === `Network Error`) {
          throw new Error(`Please try later`);
        }
        if (response.response && response.response.status === ERROR_LOGIN) {
          throw new Error(`Please enter a valid email address`);
        }
        dispatch(ActionCreator.setUser(response.data));
        if (localStorage) {
          localStorage.setItem(`user`, JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        const errorMessage = error.message || error;
        dispatch(ActionCreator.setErrorMessage(errorMessage));
        return Promise.reject(errorMessage);
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload
      };

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionType.SET_NEED_AUTH:
      return {
        ...state,
        needAuth: action.payload
      };

    case ActionType.RESET:
      return {
        ...initialState
      };

    default:
      return state;
  }
};

export {
  ActionCreator,
  ActionType,
  reducer,
  Operation
};
