const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/AuthController');
const brandController = require('../controllers/BrandController');

router.get('/brands', verifyJWT, brandController.index);
router.post('/brands', verifyJWT, brandController.store);
router.put('/brands', verifyJWT, brandController.update);
router.delete('/brands', verifyJWT, brandController.destroy);

module.exports = router;