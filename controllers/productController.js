const productService = require('../services/productService');

// EM QUAL LUGAR TRATAMOS DADOS PAARA ENVIAR AO USUÁRIO, NO SERVICE OU NO MODEL?

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

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productService.update(id, name, quantity);
  if (result.message) return res.status(result.status).json({ message: result.message }); 
  return res.status(200).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productService.remove(id);
  if (result.message) return res.status(result.status).json({ message: result.message }); 
  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};