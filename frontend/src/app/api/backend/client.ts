import axios from 'axios';

import pino from 'pino';
const logger = pino({});

const client = axios.create({
  baseURL: process.env.BACKEND_ENDPOINT,
  timeout: 900_000,
  
});

client.interceptors.request.use(
  (request) => {
    logger.info(
      {
        method: request.method,
        url: `${request.baseURL}${request.url}`,
        data: request.data,
      },
      'Outgoing request',
    );

    return request;
  },
  (error) => {
    logger.error(error, 'Request error');
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    logger.info(
      {
        status: response.status,
        data: response.data,
      },
      'Incoming response',
    );

    return response;
  },
  (error) => {
    logger.error(error, 'Response error');
    return Promise.reject(error);
  },
);

export default client;
