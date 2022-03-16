const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/login', (req, res) => {
  res.send('Bateu Get na API');
});

router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;