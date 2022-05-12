const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');
// const schema = require('../utils/checks');

const getAll = async () => {
  const products = await salesModel.getAll();
  return products;
};

const getById = async (id) => {
  const products = await salesModel.getById(id);
  return products;
};

const create = async (newSales) => {
  const verifiedStorage = await productModel.verifyStorageProducts(newSales);
  console.log('🚀 ~ file: salesService.js ~ line 18 ~ create ~ verifiedStorage', verifiedStorage);
  const result = verifiedStorage
    .find(({ for_sale: forSale }) => forSale === 'Não temos em estoque');
  console.log('🚀 ~ file: salesService.js ~ line 21 ~ create ~ result', result);
    
  if (result && result.for_sale) return errorMessage(422, 'Such amount is not permitted to sell');
  await productModel.calcQuantiy(newSales, '-');
  const sale = await salesModel.create(newSales);
  return sale;
};

const update = async (saleList, id) => {
  const sale = await salesModel.update(saleList, id);
  return sale;
};

const remove = async (id) => {
  const hasProductId = await salesModel.getById(id);
  await productModel.calcQuantiy(hasProductId, '+');
  if (hasProductId.length === 0) return errorMessage(404, 'Sale not found');
  const result = await salesModel.remove(id);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};