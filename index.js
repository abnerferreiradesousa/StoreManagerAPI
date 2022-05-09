const bodyParser = require('body-parser');
const app = require('./app');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const validName = require('./middlewares/validNameMiddleware');
const validQuantity = require('./middlewares/validQuantityMiddleware');

require('dotenv').config();
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(bodyParser.json());

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
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

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});