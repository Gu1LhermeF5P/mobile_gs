import axios from 'axios';

const api = axios.create({
  // Se estiver no celular físico, use o IP da sua máquina (ex: 192.168.0.X)
  baseURL: 'http://172.22.48.1:8080/api', 
  headers: { 'Content-Type': 'application/json' }
});

export default api;