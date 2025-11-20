import axios from 'axios';

const api = axios.create({
  // SUBSTITUA 192.168.0.109 PELO SEU IP ATUAL SE TIVER MUDADO
  baseURL: 'http://192.168.0.109:8080/api', 
  timeout: 10000, 
  headers: { 'Content-Type': 'application/json' }
});

export default api;