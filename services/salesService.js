const salesModel = require('../models/salesModel');
// const errorMessage = require('../utils/generataErrorMessage');
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
  // if (sale === undefined) return null;
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};