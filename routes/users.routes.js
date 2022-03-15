const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.index);
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

module.exports = router;