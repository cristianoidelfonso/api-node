const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

router.get('/users', verifyJWT,  userController.index);
router.post('/users', verifyJWT, userController.store);
router.put('/users/:id', verifyJWT, userController.update);
router.delete('/users/:id', verifyJWT, userController.destroy);

module.exports = router;