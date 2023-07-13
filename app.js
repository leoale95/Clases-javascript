// Clases and constructor
class productManager {
    constructor(){
        this.products = [];
        this.nextProductID = 1;
    }

    // Add Product
    addproduct (title, description, price,thumbnail, code, stock){
        //Validate data // !=else //  -- || = or // if there is no tittle, error // 
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Todos los campos son obligatorios.');
            return;
        }

        //Validate that "code" is not repeated
        const existingProduct = this.products.find((product) => product.code === code);
        if (existingProduct) {
        console.log('Error: The code already exists');
        return;
        }

        // objets // Keys and values
        const newProduct = {
            id: this.nextProductID,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct) // Push the new product
        this.nextProductID++; // autoincrement

        console.log('Product has been succesfully added');
    }      

    getproducts(){
        return this.products;
    }

    getProductByID(id) {
        const product = this.products.find((product) => product.id == id);
        if (!product) {
            console.log('Error: Product not found');
        }
        return product;
    }
    }

  // Example
  
  const manager = new productManager();

  manager.addproduct('producto prueba', 'este es un producto prueba', 200, 'sin imagen', 'abc123',' 25')

  manager.addproduct('Producto 2', 'Descripción del producto 2', 19.99, 'imagen2.jpg', 'P2', 5);

  const allProducts = manager.getproducts();
  console.log(allProducts);

  const productById = manager.getProductByID(2)
  console.log(productById);

  const nonExistentProduct = manager.getProductByID(3)
  console.log(nonExistentProduct);

