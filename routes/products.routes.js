const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/AuthController');
const productController = require('../controllers/ProductController');

router.get('/products', verifyJWT, productController.index);
router.get('/products/:id', verifyJWT, productController.show);
router.post('/products', verifyJWT, productController.store);
router.put('/products/:id', verifyJWT, productController.update);
router.delete('/products/:id', verifyJWT, productController.destroy);

module.exports = router;