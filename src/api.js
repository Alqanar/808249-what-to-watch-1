import axios from "axios";


const TIMEOUT = 5000;

const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/wtw`,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.status === 403) {
      onLoginFail();
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
