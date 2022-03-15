const express = require('express');

const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const auth = require('./routes/auth.routes');
const users = require('./routes/users.routes');
const categories = require('./routes/categories.routes');
const brands = require('./routes/brands.routes');
const products = require('./routes/products.routes');

app.use(auth);
app.use(users);
app.use(categories);
app.use(brands);
app.use(products);

app.get('/', (request, response) => {
  response.send('Hello world! Funcionando!');
});

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000')
});

