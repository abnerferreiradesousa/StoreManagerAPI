const validName = (req, res, next) => {
  const { name } = req.body;
  switch (true) {
    case !name:
      res.status(400).json({ message: '"name" is required' });
      break;
    case name.length < 5:
      res.status(422).json({ message: '"name" length must be at least 5 characters long' });
      break;
    case typeof name !== 'string':
      res.status(415).json({ message: '"name" must be a string type' });
      break;
    default:
      next();
      break;
  }
};

module.exports = validName;