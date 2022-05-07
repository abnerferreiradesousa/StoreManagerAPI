const salesModel = require('../models/salesModel');
const errorMessage = require('../utils/generataErrorMessage');
const schema = require('../utils/checks');

const getAll = async () => {
  const products = await salesModel.getAll();
  return products;
};

const getById = async (id) => {
  const { error } = schema.validate({ id });
  if (error) return errorMessage(404, 'Id must be valid');
  const products = await salesModel.getById(id);
  return products;
};

module.exports = {
  getAll,
  getById,
};