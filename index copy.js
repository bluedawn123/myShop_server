const cors = require('cors'); //항상 최상위
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8000;

//프론트단에서 넘어온 요청 파싱(변환) 미들웨어 (body-parser). 꼭 필요!!
app.use(express.json());  //name=alice&age=25 이렇게 오는걸
app.use(express.urlencoded()); //json형식으로 변환 

const corsOptions = {
  origin : '*',
}

app.use(cors(corsOptions));

// 데이터베이스 연결
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.code);
      console.error('SQL Message:', err.sqlMessage);
      return;
    }
    console.log('Connected to the database');
  });

// app.get('/', (req, res) => {
//   const sql = "INSERT INTO requested (rowno) VALUES (1)";
//   db.query(sql, (err, rows, fields) => {
//     if (err) throw err;  
//     res.send('성공');
//     console.log('데이터 추가 성공')
//   })  
// })

app.get('/list', (req, res) => {
  const sql = "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE , '%Y-%m-%d') AS REGISTER_DATE FROM board";
  db.query(sql, (err, result) => {
    if (err) throw err;  
    res.send(result);
  })  
})

app.post('/insert', (req, res) => { 
  // req.body.지정한name 으로 데이터를 받아온다.
  let title = req.body.title;
  let content = req.body.content;

  const sql = "INSERT INTO board (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?, ?, 'admin')";
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;  
    res.send(result);
  })  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//db.end()