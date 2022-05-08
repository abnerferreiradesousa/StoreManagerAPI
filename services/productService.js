const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const products = await productModel.getById(id);
  return products;
};

const create = async (name, quantity) => {
  const hasProductName = await productModel.getByName(name);
  console.log('🚀 ~ file: productService.js ~ line 16 ~ create ~ hasProductName', hasProductName);
  if (hasProductName.length > 0) return errorMessage(409, 'Product already exists');
  const result = await productModel.create(name, quantity);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};