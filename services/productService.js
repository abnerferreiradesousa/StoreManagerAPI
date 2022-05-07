const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');
const schema = require('../utils/checks');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const { error } = schema.validate({ id });
  if (error) return errorMessage(404, 'Id must be valid');
  const products = await productModel.getById(id);
  return products;
};

module.exports = {
  getAll,
  getById,
};