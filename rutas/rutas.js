const express = require('express');
const router = express.Router();
const apiClient = require('../conexion');

// Obtener lista de pokemones con paginación
router.get('/pokemon', async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    
    const response = await apiClient.get(`/pokemon?limit=${limit}&offset=${offset}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener lista de pokemones:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Obtener detalles de un pokemon específico por nombre o ID
router.get('/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await apiClient.get(`/pokemon/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error al obtener detalles del pokemon ${req.params.id}:`, error.message);
    res.status(404).json({ error: 'Pokemon no encontrado' });
  }
});

// Obtener tipos de pokemon
router.get('/types', async (req, res) => {
  try {
    const response = await apiClient.get(`/type`);
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener tipos de pokemon:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de la API' });
  }
});

// Obtener imágenes de un pokemon específico por nombre o ID
router.get('/pokemon/:id/images', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await apiClient.get(`/pokemon/${id}`);
    
    // Extraer todas las imágenes disponibles del pokemon
    const sprites = response.data.sprites;
    
    // Crear un objeto con todas las URLs de imágenes disponibles
    const images = {
      default: {
        front: sprites.front_default,
        back: sprites.back_default,
        front_female: sprites.front_female,
        back_female: sprites.back_female
      },
      shiny: {
        front: sprites.front_shiny,
        back: sprites.back_shiny,
        front_female: sprites.front_shiny_female,
        back_female: sprites.back_shiny_female
      },
      official_artwork: sprites.other?.['official-artwork']?.front_default,
      dream_world: sprites.other?.dream_world?.front_default,
      home: sprites.other?.home?.front_default
    };
    
    res.json(images);
  } catch (error) {
    console.error(`Error al obtener imágenes del pokemon ${req.params.id}:`, error.message);
    res.status(404).json({ error: 'Pokemon no encontrado o no se pudieron obtener las imágenes' });
  }
});

module.exports = router;