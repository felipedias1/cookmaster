const error = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json(err.message);
  }
  res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
  error,
};