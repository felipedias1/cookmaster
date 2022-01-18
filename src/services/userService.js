const JOI = require('@hapi/joi');
const user = require('../models/userModel');

const userSchema = JOI.object({
  name: JOI.string().required(), 
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

module.exports = {
  newUserServ,
};