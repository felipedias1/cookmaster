const user = require('../services/userService');

const newProductController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await user.newUserServ(name, email, password);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  newProductController,
};