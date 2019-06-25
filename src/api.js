import axios from "axios";


const TIMEOUT = 5000;
const ERROR_WITHOUT_SIGN_IN = 403;
const ERROR_SERVER = 500;
const NETWORK_ERROR = `Network Error`;

const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    if (err.status === ERROR_WITHOUT_SIGN_IN) {
      onLoginFail();
    }
    if (err.status === ERROR_SERVER || err.message === NETWORK_ERROR) {
      const alert = window[`alert`];
      alert(`Connection error. Please try later.`);
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
