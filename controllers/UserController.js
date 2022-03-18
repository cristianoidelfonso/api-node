const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.index = (request, response) => {
  User.find({}, (error, users) => {
    if(error) return response.status(400).send({message: 'Error listing users', error });
    if(users.length <= 0) return response.status(400).send({ message: 'There are no registered users' });
    response.status(200).send(users);
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
      return response.status(400).send(error)
    }else{
      
      return response.status(201)
        .send({ 
          message: 'User created successfully', 
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
    if (error) return response.status(400).send({ message: 'Error updating user', error });
    response.status(200).send({ message: 'User successfully updated', user  });
  });
}

module.exports.destroy = (request, response) => {
  const id = request.params.id;

  User.findByIdAndRemove(id, (error, user) => {
    if (error) return response.status(400).json({ message: 'Error deleting user', error });
    response.status(200).send({ message: 'User deleted successfully', brand  });
  });
} 