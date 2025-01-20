const db = require("../config/db");

// 모든 카테고리 조회
exports.getAllCategories = (req, res) => {
  const query = "SELECT * FROM category";
  db.query(query, (err, results) => {
    if (err) {
      console.error("데이터 조회 오류:", err);
      return res.status(500).json({ error: "데이터 조회 실패" });
    }
    res.status(200).json(results);
  });
};

// 카테고리 등록
exports.addCategory = (req, res) => {
  console.log("addCategory controller hit"); // 디버깅 추가
  console.log("Request body:", req.body); // 요청 본문 출력

  const { code, name, step, pcode } = req.body;

  if (!code || !name || !step) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const query = `
    INSERT INTO category (code, name, step, pcode)
    VALUES (?, ?, ?, ?)
  `;
  const params = [code, name, step, pcode || null];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("카테고리 등록 오류:", err);
      return res.status(500).json({ error: "카테고리 등록 실패" });
    }
    console.log("DB Insert Success:", result); // 디버깅 추가
    res.status(201).json({ message: "카테고리가 등록되었습니다." });
  });
};