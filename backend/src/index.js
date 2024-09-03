import app from './app.js';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});