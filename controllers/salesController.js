const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();
  if (!sales) return res.status(404).json({ message: 'No sales' });
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const sales = await salesService.getById(req.params.id);
  console.log('🚀 ~ file: salesController.js ~ line 11 ~ getById ~ sales', sales);
  
  if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sales);
};

module.exports = {
  getAll,
  getById,
};