const Product = require('../models/Product');

// Index Products
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find().populate(['category', 'brand']);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send({ error: 'Error loading products.', error });
  }
};

// Show Product
module.exports.show = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(['category', 'brand']);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send({ error: 'Error loading product.', error });
  }
};

// Store Product 
module.exports.store = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(400).send({ error: 'Error creating new product', error });
  }
};

// Update Product
module.exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    // return res.status(200).send({ product });
    return res.status(200).send({ msg: 'Product successfully updated', product });
  } catch (error) {
    return res.status(400).send({ error: 'Error updating product', error });
  }
};

// Delete Product
module.exports.destroy = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    return res.status(200).send({ msg: 'Product deleted successfully' });
  } catch (error) {
    return res.status(400).send({ error: 'Error deleting product', error });
  }
};