const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// 비밀번호 해싱
const plainPassword = '123123';
const hashedPassword = bcrypt.hashSync(plainPassword, 10);
// console.log('Hashed Password:', hashedPassword);

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
  console.log('데이터 베이스에 연결되었습니다');
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
      { expiresIn: '30m' }
    );

    return res.status(200).json({ message: '로그인 성공', token, role: user.role || 'user' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer [token]에서 토큰 추출

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

    req.user = user; // 유효한 토큰인 경우, 사용자 정보 저장
    next();
  });
};

// 보호된 경로 예시 => 추후 사용할수도...?
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: '인증된 사용자만 접근 가능합니다.', user: req.user });
});

app.get('/list', (req, res) => {
  const sql = "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE , '%Y-%m-%d') AS REGISTER_DATE FROM board";
  db.query(sql, (err, result) => {
    if (err) throw err;  
    res.send(result);
  })  
})

app.post('/insert', (req, res) => {
  //중요
  //클라이언트단에서 post로 보낸 정보는 req에 들어있고, 이걸 확인해보면
  //req.body에 각각 나뉘어져 들어있다. 이 부분이 php와 다름
  let title = req.body.title;
  let content = req.body.content;
  const sql = "INSERT INTO board (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,'admin')";
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;  
    res.send(result);
  })  
})



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
