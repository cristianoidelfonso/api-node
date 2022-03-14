const User = require('../models/User');

module.exports.index = (request, response) => {
  User.find({}, (error, users) => {
    if(error) return response.status(500).json({message: 'Error ao listar usuários', error: error });
    if(users.length <= 0) return response.status(200).send({ message: 'Não há usuarios cadastrados.' });
    response.status(200).send({ message: 'Usuarios listados com sucesso!', users : users });
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
    if (error) return response.status(500).json({ message: 'Error ao criar novo usuário.', error: error });
    response.status(201).send({ message: 'Usuario criado com sucesso!', user:user });
  });
}

module.exports.update = (request, response) => {
  const id = request.body._id;
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;
  
  User.findByIdAndUpdate(id, {name, email, password}, (error, user) => {
    if (error) return response.status(500).json({ message: 'Error ao atualizar dados do usuários.', error: error });
    response.status(200).redirect('/users');
  });
}

module.exports.destroy = (request, response) => {
  const id = request.body._id;

  User.findByIdAndRemove(id, (error, user) => {
    if (error) return response.status(500).json({ message: 'Error ao excluir usuários.', error: error });
    response.status(200).redirect('/users');
  });
} 