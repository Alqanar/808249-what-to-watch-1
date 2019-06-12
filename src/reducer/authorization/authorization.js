const initialState = {
  user: {
    id: null,
    email: ``,
    name: ``,
    avatarUrl: ``
  },
  needAuth: false
};

const ActionType = {
  EMPTY_ACTION: `EMPTY_ACTION`,
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
    return api.post(`/login`, {
      email: login,
      password
    })
      .then((response) => {
        dispatch(ActionCreator.setUser(response.data));
        if (localStorage) {
          localStorage.setItem(`user`, JSON.stringify(response.data));
        }
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

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
