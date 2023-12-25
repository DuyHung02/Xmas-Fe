import Axios from 'axios';

export function createAxiosInstance() {
  return Axios.create({
    timeout: 60000,
    baseURL: `${process.env.REACT_APP_URL_API}/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.request.use(
  async config => {
    const requestConfig = config;
    if (localStorage.getItem('auth.token')) {
      requestConfig.headers = {
        Authorization: `Bearer ${localStorage.getItem('auth.token')}`,
      };
    }

    return requestConfig;
  },
  err => {
    return Promise.reject(err);
  },
);

export { axiosInstance };
