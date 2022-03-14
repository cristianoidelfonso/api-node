const mongoose = require('mongoose');
const { Schema } = mongoose;

// const schema = new mongoose.Schema({ name: 'string', size: 'string' });
// const Tank = mongoose.model('Tank', schema);

const schema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: { 
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },

  password: {
    type: String,
    required: true
  }

}, { versionKey: false });

const UserModel = mongoose.model('User', schema);

module.exports =  mongoose.model('users', UserModel);