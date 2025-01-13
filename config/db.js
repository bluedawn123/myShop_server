//데이터베이스 연결 설정
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

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

module.exports = db;