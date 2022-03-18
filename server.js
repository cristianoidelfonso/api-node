require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// // app.use(function(req, res, next){
// //   res.set({
// //     'Content-Type': 'application/json',
// //     'Access-Control-Allow-Origin': '*',
// //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
// //   });
// //   res.setHeader();
// //   res.setHeader('Access-Control-Allow-Headers', 'content-type');
// //   res.setHeader('Content-Type', 'application/json');
// //   res.setHeader('Access-Control-Allow-Credentials', true);
// //   next();
// //  });

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

const PORT = process.env.PORT || 5055

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});