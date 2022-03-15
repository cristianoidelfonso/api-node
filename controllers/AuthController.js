const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

// function verifyJWT(req, res, next){
//   var token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
//   JWT.verify(token, process.env.SECRET, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
//     // se tudo estiver ok, salva no request para uso posterior
//     req.userId = decoded.id;
//     next();
//   });
// }

module.exports.login = (req, res) => {
  try {
    // Consulta usuario no banco de dados pelo email
    User.findOne({ email: req.body.email }).exec((error, user) => {
      if(error) { res.status(500).send({ message: error }); return; }
      if (!user) { return res.status(404).send({ message: "User Not found." });}

      // Verifica se a senha informada é valida para o usuario
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid ) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

    const token = JWT.sign( { user: user._id }, process.env.SECRET, { expiresIn: 86400 /*24h*/ }); 

      return res.status(200).send({
          id: user._id,
          name: user.name,
          email: user.email,
          accessToken: token
      });
    }); 
  } catch (error) {
    return res.status(401).send({ error });
  }
};


module.exports.logout = async (req, res) => {
  res.status(200).send({ token: null });
};


