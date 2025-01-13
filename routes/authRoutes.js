//인증 라우트
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router;
