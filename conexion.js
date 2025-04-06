const axios = require('axios');

// Configuración base para axios
const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición a la API:', error.message);
    return Promise.reject(error);
  }
);

module.exports = apiClient;