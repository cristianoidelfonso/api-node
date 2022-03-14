const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const Product = require('../models/Product');

// router.get('/products', productController.index);
// router.post('/products', productController.store);
// router.put('/products', productController.update);
// router.delete('/products', productController.destroy);


// Index Product
router.get('/products', async(req, res) => {
  try {
    const products = await Product.find().populate(['category', 'brand']);
    return res.status(200).send({ products });
  } catch (error) {
    return res.status(400).send({ error: 'Error loading products.', error });
  }
});

// Show Product
router.get('/products/:productId', async(req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(['category', 'brand']);
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(400).send({ error: 'Error loading product.', error });
  }
});

// Create Product 
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create({ ...req.body });

    return res.status(201).send({ product });

  } catch (error) {
    return res.status(400).send({ error: 'Error creating new product.', error });
  }
});

// Update Product
router.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, { ...req.body });
    return res.status(200).send({ product });
  } catch (error) {
    return res.status(400).send({ error: 'Error updating product.', error });
  }
});

// Delete Product
router.delete('/products/:productId', async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.productId);
    return res.status(200).send();
  } catch (error) {
    return res.status(400).send({ error: 'Error deleting product.', error });
  }
});





module.exports = router;