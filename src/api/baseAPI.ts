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
      if (process.env.NODE_ENV === "development"){
        console.log(error.response);
      }
      return Promise.reject(
        createError(error.response.status, error.response.data.error || ''),
      );
    },
  );
  return instance;
};

export default createInstance;
