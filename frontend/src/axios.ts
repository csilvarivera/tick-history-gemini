import baseAxios from 'axios';

export const axios = baseAxios.create({
  baseURL: "/api",
  timeout: 900_000,
});
