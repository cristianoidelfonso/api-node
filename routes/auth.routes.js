const express = require('express');
const JWT = require('jsonwebtoken');

const router = express.Router();

function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  JWT.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

router.post('/login', (req, res) => {
  try {
    const user = {
      email : req.body.email,
      password : req.body.password
    }

    if(user.email === 'cristiano@email.com' && user.password === '123456'){
      const token = JWT.sign( user, process.env.SECRET, { expiresIn: '1h' });
      user.token = token;
      return res.status(200).send({ user });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
});

router.post('/logout', (req, res) => {

});

module.exports = router;