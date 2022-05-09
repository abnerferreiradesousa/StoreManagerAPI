const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  switch (true) {
    case !quantity:
      res.status(400).json({ message: '"quantity" is required' });
      break;
    case quantity.length <= 0:
      res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
      break;
    case !Number.isInteger(quantity):
      res.status(415).json({ message: '"quantity" must be a integer' });
      break;
    default:
      next();
      break;
  }
};

module.exports = validQuantity;