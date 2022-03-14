const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports.index = (request, response) => {
  User.find({}, (error, users) => {
    if(error) return response.status(500).json({message: 'Error ao listar usuários'});
    response.send( {message: 'Usuarios listados com sucesso!', users : users });
  });
}

module.exports.store = (request, response) => {
  const password = request.body.password

  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: password,
  });

  user.save((error, user) => {
    if(error) return response.status(500).json({message: 'Error ao criar novo usuário.'});
    response.send({ message: 'Usuario criado com sucesso!', user:user }, 201);
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  const email = request.body.email;
  
  User.findByIdAndUpdate(id, {name, email}, (error, user) => {
    if(error) return response.status(500).json({message: 'Error ao atualizar dados do usuários.'});
    response.status(200).redirect('/users');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  User.findByIdAndRemove(id, (error, user) => {
    if(error) return response.status(500).json({message: 'Error ao excluir usuários.'});
    response.status(200).redirect('/users');
  });
} 