import axios from 'axios';

const api = axios.create({
  // 🛑 MUDE ISTO PARA O IP DO SEU PC (cmd -> ipconfig -> IPv4)
  baseURL: 'http://172.22.48.1:8080/api',
  timeout: 5000, 
  headers: { 'Content-Type': 'application/json' }
});

export default api;