const mongoose = require('mongoose');

const url = `mongodb://localhost/mypharma`;

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error ao conectar MongoDB'));

db.once('open', () => {
  console.log('Conectado ao MongoDB com sucesso');
});

module.exports = db;