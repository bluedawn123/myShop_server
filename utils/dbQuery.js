//데이터베이스 쿼리 헬퍼 함수
const db = require('../config/db');

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

module.exports = dbQuery;