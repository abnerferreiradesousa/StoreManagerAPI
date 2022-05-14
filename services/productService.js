const productModel = require('../models/productModel');
const errorMessage = require('../utils/generataErrorMessage');

const getAll = async () => {
  const products = await productModel.getAll();
  if (!products) {
    throw errorMessage(404, 'No products');
  }
  return products;
};

const getById = async (id) => {   
  const product = await productModel.getById(id);
  if (!product.length) {
    throw errorMessage(404, 'Product not found');
  }
  return product;
};

const create = async (name, quantity) => {
  const hasProductNameInDb = await productModel.getByName(name);
  if (hasProductNameInDb.length) {
    throw errorMessage(409, 'Product already exists');
  }
  const productCreated = await productModel.create(name, quantity);
  return productCreated;
};

const update = async (id, name, quantity) => {
  const hasProductIdInDb = await productModel.getById(id);
  if (!hasProductIdInDb.length) {
    throw errorMessage(404, 'Product not found');
  }
  const productUpdated = await productModel.update(id, name, quantity);
  return productUpdated;
};

const remove = async (id) => {
  const hasProductId = await productModel.getById(id);
  if (!hasProductId.length) {
    throw errorMessage(404, 'Product not found');
  }
  await productModel.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};