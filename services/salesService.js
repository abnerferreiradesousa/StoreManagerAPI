const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');
// const schema = require('../utils/checks');

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales) {
    throw errorMessage(404, 'No sales');
  }
  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  if (!sales.length) throw errorMessage(404, 'Sale not found');
  return sales;
};

const create = async (newSales) => {
  const verifiedStorage = await productModel.verifyStorageProducts(newSales);
  const result = verifiedStorage
    .find(({ for_sale: forSale }) => forSale === 'Não temos em estoque');
  if (result && result.for_sale) {
    throw errorMessage(422, 'Such amount is not permitted to sell');
  }
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
  if (!hasProductId.length) throw errorMessage(404, 'Sale not found');
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