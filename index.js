const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// 비밀번호 해싱
const plainPassword = '123123';
const hashedPassword = bcrypt.hashSync(plainPassword, 10);
console.log('Hashed Password:', hashedPassword);

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8000;

// Middleware settings
app.use(express.json());
app.use(cors());

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myshop',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myshop',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Helper function to handle database queries
const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Login endpoint
// Login endpoint
app.post('/login', async (req, res) => {
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

    // Generate JWT token with role
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role || 'user', // 기본값으로 'user' 역할 설정
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: '로그인 성공', token, role: user.role || 'user' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
