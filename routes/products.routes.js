const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/products', productController.index);
router.get('/products/:id', productController.show);
router.post('/products', productController.store);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.destroy);

module.exports = router;