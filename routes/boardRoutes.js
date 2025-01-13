//게시판 라우트
const express = require('express');
const boardController = require('../controllers/boardController');

const router = express.Router();

router.get('/list', boardController.getList);
router.post('/insert', boardController.insertBoard);

module.exports = router;
