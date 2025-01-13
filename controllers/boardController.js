//게시판 관련 로직
const dbQuery = require('../utils/dbQuery');

exports.getList = async (req, res) => {
  const query = `
    SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, 
           DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE 
    FROM board
  `;
  try {
    const results = await dbQuery(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching board list:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.insertBoard = async (req, res) => {
  const { title, content } = req.body;

  const query = `
    INSERT INTO board (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) 
    VALUES (?, ?, 'admin')
  `;
  try {
    const result = await dbQuery(query, [title, content]);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting board:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};
