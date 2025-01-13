//JWT 인증 미들웨어
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: '토큰이 만료되었습니다.' });
      }
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
