const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const User = require('../models/User');


module.exports.verifyJWT = async (req, res, next) => {
  
  if (!req.headers["authorization"]) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  const [type, token] = req.headers["authorization"].split(' ');

  if(type !== 'Bearer' || !token){
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  JWT.verify(token, process.env.SECRET, function(error, decoded) {
    if (error) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.', error });
  
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.user;

    next();
  });
}

module.exports.login = async (req, res) => {
  try {

    // const user = await User.findOne({ email: req.body.email },{createdAt: 0, updatedAt: 0}).exec();
    // if (!user) { return res.send({ message: "User Not found." });}
    // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // if (!passwordIsValid ) {
    //   return res.status(401).send({ accessToken: null, message: "Invalid Password!"});
    // }
    // const token = JWT.sign( { user: user._id }, process.env.SECRET, { expiresIn: 86400 /*24h*/ }); 
    // return res.status(200).send({
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     accessToken: token
    // });


    
  // Consulta usuario no banco de dados pelo email
     User.findOne({ email: req.body.email }, {createdAt: 0, updatedAt: 0} ).exec((error, user) => {
      if(error) { res.status(500).send({ message: error }); return; }
      if (!user) { res.send({ message: "User Not found."}); return; }
      // Verifica se a senha informada é valida para o usuario
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid ) {
        return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
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
    return res.send( error );
  }
};


module.exports.logout = async (req, res) => {
  res.status(200).send({ token: null });
};


