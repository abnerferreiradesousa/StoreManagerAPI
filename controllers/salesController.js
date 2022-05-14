const salesService = require('../services/salesService');

// P Q AQUI RETORNA UNDEFINED, CASO ESTEJA VAZIO E EMBAIXO RETORNA UM ARRAY VAZIO
const getAll = async (req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    next(error);    
  }
};

const getById = async (req, res, next) => {
  try {
    const sales = await salesService.getById(req.params.id);
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newSalesList = [...req.body];
    const sale = await salesService.create(newSalesList);
    return res.status(201).json(sale);
  } catch (error) {
    next(error);    
  }
};

const update = async (req, res) => {
  const newSalesList = [...req.body];
  const { id } = req.params;
  const sale = await salesService.update(newSalesList, id); 
  return res.status(200).json(sale);
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.remove(id);
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