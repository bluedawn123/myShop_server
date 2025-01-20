const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const categoryRoutes = require("./routes/categoryRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000; // 환경 변수를 사용해 포트를 설정

// Middleware 설정
app.use(bodyParser.json()); // 요청 본문을 JSON 형식으로 파싱
app.use(cors()); // CORS 정책 활성화
app.use(express.json()); // JSON 요청 본문 처리

// 라우트 설정
app.use('/auth', authRoutes); // 인증 관련 라우트
app.use('/board', boardRoutes); // 게시판 관련 라우트
app.use("/api/categories", categoryRoutes);


// 기본 라우트 (서버 상태 확인용)
app.get('/', (req, res) => {
  res.status(200).send('Server is running.');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
