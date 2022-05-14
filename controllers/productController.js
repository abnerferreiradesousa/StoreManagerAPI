const productService = require('../services/productService');

const getAll = async (_req, res, next) => {
  try {
    const product = await productService.getAll();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const product = await productService.getById(req.params.id);
    return res.status(200).json(product[0]);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.create(name, quantity);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await productService.update(id, name, quantity);
    return res.status(200).json(result);
  } catch (error) {
    next(error);    
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.remove(id);
    return res.status(204).end();
  } catch (error) {
    next(error);    
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};