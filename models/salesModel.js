const connection = require('./connection');

const convertKeys = (sale) => ({
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  });

  // da um apelido 
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
  return allSales;
};

const getIdSale = async () => {
  const allSales = await getAllFromSales();
  const response = await connection
    .execute('INSERT INTO sales (id) VALUES (?);', [allSales.length + 1]);
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
  sales
    .map(async ({ quantity, productId }) => createSale(saleId, quantity, productId));
  const resgiterResponse = {
    id: saleId,
    itemsSold: sales,
  };
  return resgiterResponse;
};

const updateSale = async (quantity, productId, id) => {
  await connection
  .execute(
    `UPDATE sales_products 
    SET quantity = ?, product_id = ?
    WHERE sale_id = ?;`,
    [quantity, productId, id],
);
};

const update = async (saleList, id) => {
  // promisse all 
  // nao fazer map no model
  saleList.map(async ({ quantity, productId }) => updateSale(quantity, productId, id));
  const updatedResponse = {
    saleId: Number(id),
    itemUpdated: [{ ...saleList[0] }],
  };
  return updatedResponse;
};

const remove = async (id) => {
  const [result] = await connection
  .execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllFromSales,
  getIdSale,
};