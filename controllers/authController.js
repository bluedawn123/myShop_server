// 로그인 및 인증 관련 로직
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbQuery = require('../utils/dbQuery');

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }

  try {
    const query = 'SELECT * FROM admin WHERE username = ?';
    const results = await dbQuery(query, [username]);

    if (results.length === 0) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const user = results[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role || 'user' },
      JWT_SECRET,
      { expiresIn: '30m' }
    );

    return res.status(200).json({ message: '로그인 성공', token, role: user.role || 'user' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
};
