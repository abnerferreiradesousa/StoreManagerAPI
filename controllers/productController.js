const productService = require('../services/productService');

const getAll = async (req, res) => {
  const product = await productService.getAll();
  if (!product) return res.status(404).json({ message: 'No products' });
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.create(name, quantity);
  if (result.message) return res.status(result.status).json({ message: result.message }); 
  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  create,
};