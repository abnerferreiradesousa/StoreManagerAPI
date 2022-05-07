const app = require('./app');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.get('/products', productController.getAll);
app.get('/products/:id', productController.getById);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});