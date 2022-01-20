const jwt = require('jsonwebtoken');

const API_SECRET = 'bhhmiojui4ph3u4gngnytifgih2';

const JWT_CONFIG = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    const { data } = decoded;
    return data;
  } catch (error) {
    console.log('Authorization is not valid');
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};