/* const { ObjectId } = require('mongodb'); */
const connection = require('./connection');

const newUserMod = async (name, email, password) => {
  const connect = await connection();
  const role = 'user';

  const { insertedId } = await connect.collection('users').insertOne({
      name,
      email,
      password,
      role,
  });
  return { user: { name, email, role, _id: insertedId } };
};

const searchEmail = async (email) => {
  const connect = await connection();
  const validateEmail = await connect.collection('users').findOne({ email });
  return validateEmail;
};

module.exports = {
  newUserMod,
  searchEmail,
};