const mongoose = require('mongoose');

const uri = process.env.CONNECTION_MONGO;
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error ao conectar MongoDB'));

db.once('open', () => {
  console.log('Conectado ao MongoDB com sucesso');
});

module.exports = db; 
