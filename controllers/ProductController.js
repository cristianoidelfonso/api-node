const Product = require('../models/Product');

module.exports.index = (request, response) => {
  Product.find({}, (error, products) => {
    if (error) return response.status(500).json({ message: 'Error ao listar produtos', error });
    if (products.length <= 0) return response.status(200).send({ message: 'Não há produtos cadastrados.' });
    response.status(200).send({ message: 'Marcas listadas com sucesso!', products: products });
  });
}

module.exports.store = (request, response) => {
  const product = new Product({
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    stock: request.body.stock,
    category: request.body.category,
    brand: request.body.brand,
  });

  product.save((error, product) => {
    if (error) return response.status(500).json({ message: 'Error ao cadastrar novo produto.', error });
    response.status(201).send({ message: 'Produto cadastrado com sucesso!', product: product });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  const description = request.body.description;
  const price = request.body.price;
  const stock = request.body.stock;
  const category = request.body.category;
  const brand = request.body.brand;
  
  Product.findByIdAndUpdate(id, { name, description, price, stock, category, brand }, (error, product) => {
    if (error) return response.status(500).json({ message: 'Error ao atualizar produto.', error: error });
    response.status(200).redirect('/products');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  Product.findByIdAndRemove(id, (error, product) => {
    if (error) return response.status(500).json({ message: 'Error ao excluir produto.', error: error });
    response.status(200).redirect('/products');
  });
} 