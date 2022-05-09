const connection = require('./connection');

const convertKeys = (sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  });

const getAll = async () => {
  const query = `SELECT sale_id, product_id, quantity, date
  FROM sales_products AS SP
  LEFT JOIN sales AS SL
  ON SP.product_id = SL.id;`;
  const [allSales] = await connection.execute(query);  
  return allSales.map(convertKeys);
}; 

const getById = async (id) => {
  const query = `SELECT product_id, quantity, date
  FROM sales_products AS SP
  LEFT JOIN sales AS SL
  ON SP.product_id = SL.id
  WHERE sale_id = ?;`;
  const [allSales] = await connection
    .execute(query, [id]);    
  return allSales.map(convertKeys);
};

const getAllFromSales = async () => {
  const query = 'SELECT id FROM sales';
  const [allSales] = await connection.execute(query);  
  return allSales.map(convertKeys);
};

const getIdSale = async () => {
  const allSales = await getAllFromSales();
  const response = await connection
    .execute('INSERT INTO sales (id) VALUES (?);', [allSales.length + 1]);
  console.log('🚀 ~ file: salesModel.js ~ line 34 ~ createSale ~ sale', response);
  return response[0].insertId;
};

const createSale = async (saleId, quantity, productId) => {
  const result = await connection
    .execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
  );
  return result;
};

const create = async (sales) => {
  const saleId = await getIdSale();
  const registerSale = sales
    .map(async ({ quantity, productId }) => createSale(saleId, quantity, productId));
  console.log('🚀 ~ file: salesModel.js ~ line 51 ~ create ~ registerSale', registerSale);
  const resgiterResponse = {
    id: saleId,
    itemsSold: sales,
  };
  return resgiterResponse;
};

module.exports = {
  getAll,
  getById,
  create,
};