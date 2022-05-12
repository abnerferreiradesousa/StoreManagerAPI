const salesService = require('../services/salesService');

// P Q AQUI RETORNA UNDEFINED, CASO ESTEJA VAZIO E EMBAIXO RETORNA UM ARRAY VAZIO
const getAll = async (req, res) => {
  const sales = await salesService.getAll();
  if (!sales) return res.status(404).json({ message: 'No sales' });
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const sales = await salesService.getById(req.params.id);
  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sales);
};

const create = async (req, res) => {
  const newSalesList = [...req.body];
  const sale = await salesService.create(newSalesList);
  if (sale.status) return res.status(sale.status).json({ message: sale.message });
  return res.status(201).json(sale);
};

const update = async (req, res) => {
  const newSalesList = [...req.body];
  const { id } = req.params;
  const sale = await salesService.update(newSalesList, id); 
  return res.status(200).json(sale);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.remove(id);
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