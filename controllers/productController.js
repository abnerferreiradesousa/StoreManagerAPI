const productService = require('../services/productService');

const getAll = async (req, res) => {
  const product = await productService.getAll();
  if (!product) return res.status(404).json({ message: 'No products' });
  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const product = await productService.getById(req.params.id);
  console.log(product);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};