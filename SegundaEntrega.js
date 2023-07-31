const fs = require('fs/promises');

class Container {
  constructor(file_name) {
    this.file_name = file_name;
  }

  async save(obj) {
    const objects = await this.getAll();
    const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0;
    const newId = lastId + 1;
    obj.id = newId;
    objects.push(obj);
    await this.writeData(objects);
    return newId;
  }

  async getById(objId) {
    const objects = await this.getAll();
    return objects.find((obj) => obj.id === objId) || null;
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.file_name, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async deleteById(objId) {
    const objects = await this.getAll();
    const updatedObjects = objects.filter((obj) => obj.id !== objId);
    await this.writeData(updatedObjects);
  }

  async deleteAll() {
    await this.writeData([]);
  }

  async writeData(data) {
    await fs.writeFile(this.file_name, JSON.stringify(data, null, 2));
  }
}

// Example of usage and module testing:

(async () => {
  try {
    const container = new Container('products.txt');

    const product1 = {
      title: 'Product 1',
      price: 10,
      thumbnail: 'product_1_url',
    };

    const product2 = {
      title: 'Product 2',
      price: 20,
      thumbnail: 'product_2_url',
    };

    // Save products
    const id1 = await container.save(product1);
    const id2 = await container.save(product2);

    console.log('Products saved with IDs:', id1, id2);

    // Get product by ID
    console.log('Product with ID 1:', await container.getById(id1));

    // Get all products
    console.log('All products:', await container.getAll());

    // Delete product by ID
    // await container.deleteById(id1);
    // console.log('Product with ID 1 deleted.');

    // Delete all products
    // await container.deleteAll();
    // console.log('All products deleted.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
