const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

// Container Class
class Container {
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

const container = new Container('products.txt');

// Route to get all available products
app.get('/products', async (req, res) => {
  try {
    const products = await container.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a random product
app.get('/randomProduct', async (req, res) => {
  try {
    const products = await container.getAll();
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    res.json(randomProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
