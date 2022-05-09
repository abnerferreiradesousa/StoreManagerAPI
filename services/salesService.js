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

const create = async (quantity, productId) => {
  const sale = await salesModel.create(quantity, productId);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
};