const connection = require('./connection');

const getAll = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM products');
  return allProducts;
}; 

const getById = async (id) => {
  const [product] = await connection
    .execute('SELECT * FROM products WHERE id = ?', [id]);    
  return product;
};

const getByName = async (name) => {
  const [product] = await connection
    .execute('SELECT * FROM products WHERE name = ?', [name]);    
  return product;
};

// COMO MOCKAR OS VALORES

const create = async (name, quantity) => {
  const [result] = await connection
    .execute(
      'INSERT INTO products (name, quantity) VALUES (?, ?);',
      [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  await connection
    .execute(
      `UPDATE products 
      SET name = ?, quantity = ?
      WHERE id = ?;`,
      [name, quantity, id],
  );
  return { id: Number(id), name, quantity };
};

const calcQuantiy = async (dataSalesRemoved, operation) => {
  dataSalesRemoved.forEach(async ({ quantity, productId }) => {
    await connection
      .execute(
        `UPDATE products 
        SET quantity = quantity ${operation} ?
        WHERE id = ?;`,
        [quantity, productId],
    );
  });
};

const remove = async (id) => {
  const [result] = await connection
    .execute('DELETE FROM products WHERE id = ?', [id]);
  return result;
};

// const verifyStorageProducts = async (newSales) => {
//   const query = `SELECT id, quantity
//   FROM products AS pd
//   WHERE id = ?;`;
//   const salesFound = newSales
//     .map(({ productId }) => connection.execute(query, [productId]));
//     const [[response]] = await Promise.all(salesFound);
//   return response;
// };

const verifyStorageProducts = async (newSales) => {
  const query = `SELECT 
  IF(pd.quantity < ?,
        'Não temos em estoque',
        'Tá esperando o que! Vende!') AS 'for_sale'
  FROM products AS pd
  WHERE pd.id = ?;`;
    const salesFound = newSales
    .map(({ productId, quantity }) => connection.execute(query, [quantity, productId]));
    const [[response]] = await Promise.all(salesFound);
    console.log('🚀 ~ file: productModel.js ~ line 80 ~ verifyStorageProducts ~ response', response);
    
    return response;
};

module.exports = {
  getAll,
  getById,
  create,
  getByName,
  update,
  remove,
  calcQuantiy,
  verifyStorageProducts,
};