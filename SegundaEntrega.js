const fs = require('fs/promises');

class Contenedor {
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

// Ejemplo de uso y prueba del módulo:

(async () => {
  try {
    const contenedor = new Contenedor('productos.txt');

    const product1 = {
      title: 'Producto 1',
      price: 10,
      thumbnail: 'url_producto_1',
    };

    const product2 = {
      title: 'Producto 2',
      price: 20,
      thumbnail: 'url_producto_2',
    };

    // Guardar productos
    const id1 = await contenedor.save(product1);
    const id2 = await contenedor.save(product2);

    console.log('Productos guardados con IDs:', id1, id2);

    // Obtener producto por ID
    console.log('Producto con ID 1:', await contenedor.getById(id1));

    // Obtener todos los productos
    console.log('Todos los productos:', await contenedor.getAll());

    // Eliminar producto por ID
    await contenedor.deleteById(id1);
    console.log('Producto con ID 1 eliminado.');

    // Eliminar todos los productos
    await contenedor.deleteAll();
    console.log('Todos los productos eliminados.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
