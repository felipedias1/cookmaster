const user = require('../services/userService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await user.verifyLoginServ(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return next(error);
  }
};

module.exports = {
  login,
};