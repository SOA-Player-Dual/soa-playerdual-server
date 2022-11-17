import axios from 'axios';
import 'dotenv/config';
import createError from 'http-errors';

const createInstance = (url: string) => {
  const instance = axios.create({
    baseURL: url,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(error);
      return Promise.reject(
        createError(error.response.status, error.response.data.error),
      );
    },
  );
  return instance;
};

export default createInstance;
