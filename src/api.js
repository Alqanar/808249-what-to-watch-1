import axios from "axios";


const TIMEOUT = 5000;

const api = axios.create({
  baseURL: `https://es31-server.appspot.com/wtw`,
  timeout: TIMEOUT,
  withCredentials: true,
});

export default api;
