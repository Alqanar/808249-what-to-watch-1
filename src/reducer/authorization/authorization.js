const initialState = {
  user: {
    id: null,
    email: ``,
    name: ``,
    avatarUrl: ``
  }
};

const ActionType = {
  SET_USER: `SET_USER`
};

const ActionCreator = {

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
  requestAuthorization: (login, password) => (dispatch, _, api) => {
    return api.post(`/login`, {
      email: login,
      password
    })
    .then((response) => {
      dispatch(ActionCreator.setUser(response.data));
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthorizationRequired: false,
        isAuthPage: false
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
