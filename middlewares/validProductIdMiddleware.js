const validProductId = (req, res, next) => {
  // const { productId } = req.body;
  req.body.forEach(({ productId }, index) => {
      if (!productId) {
        return res.status(400).json({ message: '"productId" is required' });
      }
      if (index === req.body.length - 1) {
        next();
      }
    }); 
};

module.exports = validProductId;