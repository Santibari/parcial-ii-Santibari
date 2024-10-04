const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Endpoint para iniciar sesión y generar un token
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Validar credenciales de usuario
    if (email === 'admin@admin.com' && password === 'admin') {
      // Crear token de sesión
      const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });

  // Middleware para verificar el token de sesión
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token requerido' });
    }
  
    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
      }
      req.user = user;  // Almacena el usuario autenticado en la solicitud
      next();
    });
  };

  // Endpoint protegido para consultar el clima según latitud y longitud
app.get('/weather', authenticateToken, async (req, res) => {
    const { latitude, longitude } = req.query;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitud y longitud son requeridos' });
    }
  
    try {
      // Petición a la API de Open Meteo
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          current_weather: true,
          hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
        }
      });
  
      // Extraer los datos de la respuesta
      const currentWeather = response.data.current_weather;
  
      res.json({
        time: currentWeather.time,
        temperature: currentWeather.temperature_2m,
        wind_speed: currentWeather.wind_speed_10m
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al consultar la API de Open Meteo', error });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
  });

  