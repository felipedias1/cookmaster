const authService = require('../services/authService');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
   
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const user = authService.verifyToken(authorization);
    
    if (!user.email) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};