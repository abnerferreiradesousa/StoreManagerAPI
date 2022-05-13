const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

// const getAll = async () => {
//   const products = await productModel.getAll();
//   if (!products) {
//     throw errorMessage(404, 'No products');
//   }
//   return products;
// };

const getById = async (id) => {
  const products = await productModel.getById(id);
  return products;
};

const create = async (name, quantity) => {
  const hasProductName = await productModel.getByName(name);
  if (hasProductName.length > 0) return errorMessage(409, 'Product already exists');
  const result = await productModel.create(name, quantity);
  return result;
};

const update = async (id, name, quantity) => {
  const hasProductId = await productModel.getById(id);
  // const hasIdProperty = Object.prototype.hasOwnProperty.call(hasProductId, 'id');
  if (hasProductId.length === 0) return errorMessage(404, 'Product not found');
  const result = await productModel.update(id, name, quantity);
  return result;
};

const remove = async (id) => {
  const hasProductId = await productModel.getById(id);
  if (hasProductId.length === 0) return errorMessage(404, 'Product not found');
  const result = await productModel.remove(id);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};