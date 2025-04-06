const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const rutas = require('./rutas/rutas');

// Usar rutas
app.use('/api', rutas);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Pokémon funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});