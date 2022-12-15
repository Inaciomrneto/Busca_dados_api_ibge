import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API || 'https://servicodados.ibge.gov.br/api/v1',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

export default api;