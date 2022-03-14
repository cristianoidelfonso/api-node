const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/users', userController.index);
router.post('/users', userController.store);
router.put('/users/', userController.update);
router.delete('/users', userController.destroy);

module.exports = router;