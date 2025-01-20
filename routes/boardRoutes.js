//게시판 라우트
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');



router.get('/list', boardController.getList);
router.post('/insert', boardController.insertBoard);

module.exports = router;
