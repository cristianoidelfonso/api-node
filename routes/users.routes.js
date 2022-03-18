const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

// Rota que permite cadastro de novo usuário
router.post('/users', userController.store);


router.get('/users', verifyJWT, userController.index);
router.put('/users/:id', verifyJWT, userController.update);
router.delete('/users/:id', verifyJWT, userController.destroy);

module.exports = router;