const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/AuthController');
const categoryController = require('../controllers/CategoryController');

router.get('/categories', verifyJWT, categoryController.index);
router.post('/categories', verifyJWT, categoryController.store);
router.put('/categories', verifyJWT, categoryController.update);
router.delete('/categories', verifyJWT, categoryController.destroy);

module.exports = router;