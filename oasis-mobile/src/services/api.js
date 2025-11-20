import axios from 'axios';

const api = axios.create({
  // AQUI ESTÁ A CORREÇÃO: Use o IP 192.168.0.109
  baseURL: 'http://192.168.0.109:8080/api', 
  timeout: 10000, 
  headers: { 'Content-Type': 'application/json' }
});

export default api;