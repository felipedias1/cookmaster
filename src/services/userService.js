const JOI = require('@hapi/joi');
const user = require('../models/userModel');
const authService = require('./authService');

const userSchema = JOI.object({
  name: JOI.string().required(), 
  email: JOI.string().email().required(),
  password: JOI.string().required(), 
});

const loginSchema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().required(), 
});

const newUserServ = async (name, email, password) => {
  const errorOne = { status: 400, message: { message: 'Invalid entries. Try again.' } };
  const errorTwo = { status: 409, message: { message: 'Email already registered' } };
  
  const validate = userSchema.validate({ name, email, password });
  if (validate.error) throw errorOne;

  const searchEmail = await user.searchEmail(email);
  if (searchEmail) throw errorTwo; 

  const newUser = await user.newUserMod(name, email, password);

  return newUser;
};

const verifyLoginServ = async (email, password) => {
  const errorOne = { status: 401, message: { message: 'All fields must be filled' } };
  const errorTwo = { status: 401, message: { message: 'Incorrect username or password' } };
  const validate = loginSchema.validate({ email, password });
  
  if (validate.error) throw errorOne;
  const checkLogin = await user.searchEmail(email);

  if (!checkLogin || checkLogin.password !== password) throw errorTwo;

  const { password: _password, ...noPassword } = checkLogin;

  const token = authService.genToken(noPassword);

  return token;
};

module.exports = {
  newUserServ,
  verifyLoginServ,
};