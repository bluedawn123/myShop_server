const express = require("express");
const { getAllCategories, addCategory } = require("../controllers/categoryController");

const router = express.Router();

// 디버깅 추가
router.post("/add", (req, res, next) => {
  console.log("POST /add route hit"); // 요청 확인
  next(); // 컨트롤러로 요청 전달
}, addCategory);

// 모든 카테고리 조회
router.get("/", getAllCategories);

module.exports = router;