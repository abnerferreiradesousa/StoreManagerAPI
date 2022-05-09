const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const validName = require('./middlewares/validNameMiddleware');
const validQuantity = require('./middlewares/validQuantityMiddleware');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.post(
  '/products',
  validName,
  validQuantity,
  productController.create,
);
app.put(
  '/products/:id',
  validName,
  validQuantity, 
  productController.update,
);
app.delete('/products/:id', productController.remove);

app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.post(
  '/sales',
// COMO FAZER AS VALIDAÇÕES?

  // validProductId,
  // validQuantity, 
  salesController.create,
);
app.put(
  '/sales/:id',
  // validProductId,
  // validQuantity, 
  salesController.update,
);

// app.delete(
//   '/sales/:id',
//   salesController.remove,
// );

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
