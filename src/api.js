import axios from "axios";
import {ActionCreator} from "./reducer/authorization/authorization.js";


const TIMEOUT = 5000;

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
