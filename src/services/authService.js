const jwt = require('jsonwebtoken');

const API_SECRET = 'bhhmiojui4ph3u4gngnytifgih2';

const JWT_CONFIG = {
  expiresIn: '2h',
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

module.exports = {
  genToken,
};