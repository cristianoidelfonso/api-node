const express = require('express');
const router = express.Router();
const brandController = require('../controllers/BrandController');

router.get('/brands', brandController.index);
router.post('/brands', brandController.store);
router.put('/brands', brandController.update);
router.delete('/brands', brandController.destroy);

module.exports = router;