const validProductId = (req, res, next) => {
  const { productId } = req.body;
  switch (true) {
    case !productId:
      res.status(400).json({ message: '"productId" is required' });
      break;
    default:
      next();
      break;
  }
};

module.exports = validProductId;