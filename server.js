const express = require('express');

const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello world! Funcionando!');
});

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000')
});

