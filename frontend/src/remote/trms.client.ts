import axios from 'axios';

const trmsClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'env' ? 'http://localhost:3001' : process.env.TRMS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default trmsClient;