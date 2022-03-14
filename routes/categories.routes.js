const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

router.get('/categories', categoryController.index);
router.post('/categories', categoryController.store);
router.put('/categories', categoryController.update);
router.delete('/categories', categoryController.destroy);

module.exports = router;