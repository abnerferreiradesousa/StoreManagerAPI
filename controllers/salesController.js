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

module.exports = {
  getAll,
  getById,
};