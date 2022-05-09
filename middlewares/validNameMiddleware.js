const validName = (req, res, next) => {
  const { name } = req.body;
  switch (true) {
    case !name:
      return res.status(400).json({ message: '"name" is required' });
    case name.length < 5:
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    case typeof name !== 'string':
      return res.status(415).json({ message: '"name" must be a string type' });
    default:
      next();
      break;
  }
};

module.exports = validName;