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

module.exports = {
  getAll,
  getById,
};