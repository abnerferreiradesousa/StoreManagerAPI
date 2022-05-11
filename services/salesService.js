const salesModel = require('../models/salesModel');
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

const create = async (sales) => {
  const sale = await salesModel.create(sales);
  return sale;
};

const update = async (saleList, id) => {
  const sale = await salesModel.update(saleList, id);
  return sale;
};

const remove = async (id) => {
  const hasProductId = await salesModel.getById(id);
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