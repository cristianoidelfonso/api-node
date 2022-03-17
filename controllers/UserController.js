const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.index = (request, response) => {
  User.find({}, (error, users) => {
    if(error) return response.status(500).json({message: 'Error ao listar usuários', error });
    if(users.length <= 0) return response.status(200).send({ message: 'Não há usuarios cadastrados.' });
    response.status(200).send({ message: 'Usuarios listados com sucesso!', users });
  });
}

module.exports.store = (request, response) => {

  const user = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password
  });

  if(user.password){
    user.password = bcrypt.hashSync(user.password, 8);
  }

  user.save((error, user) => {
    if(error){
      return response.send(error)
    }else{
      return response.status(201)
        .send({ 
          message: 'Usuario criado com sucesso!', 
          id: user._id, 
          email: user.email 
        });
    } 
  });
}

module.exports.update = (request, response) => {
  const id = request.params.id;

  const payload = {
    name : request.body.name,
    email : request.body.email,
    password : request.body.password 
  }

  User.findByIdAndUpdate(id, payload , (error, user) => {
    if (error) return response.status(500).json({ message: 'Error ao atualizar dados do usuários.', error });
    response.status(200).redirect('/users');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.params.id;

  User.findByIdAndRemove(id, (error, user) => {
    if (error) return response.status(500).json({ message: 'Error ao excluir usuários.', error });
    response.status(200).redirect('/users');
  });
} 