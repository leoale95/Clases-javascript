const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

// Clase Contenedor del desafío anterior
class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async save(data) {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error('Error writing data to file');
    }
  }
}

const contenedor = new Contenedor('productos.txt');

// Ruta para obtener todos los productos disponibles
app.get('/productos', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener un producto aleatorio
app.get('/productoRandom', async (req, res) => {
  try {
    const productos = await contenedor.getAll();
    const randomIndex = Math.floor(Math.random() * productos.length);
    const randomProducto = productos[randomIndex];
    res.json(randomProducto);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
