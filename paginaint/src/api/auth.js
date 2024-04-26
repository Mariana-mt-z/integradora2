import axios from './axios';

const API = 'http://localhost:4000/api';
export const registerRequest = user => axios.post('/register', user);

export const loginRequest = user => axios.post('/login', user);

export const verityTokenRequest = () => axios.get('/verify');

export const updateUserRequest = async (userId, userData) =>
  axios.put(`/modificar/${userId}`, userData);

  
  export const deleteUserRequest = async (userId)=> axios.delete(`/eliminar/${userId}`);
  
export const registrarMovimientoRequest = () => axios.post('/movimiento');




