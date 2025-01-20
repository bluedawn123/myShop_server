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

// const mysql = require("mysql2/promise");
// const dbConfig = require("../config/db");

// const pool = mysql.createPool(dbConfig);

// const dbQuery = async (query, params) => {
//   const connection = await pool.getConnection();
//   try {
//     const [rows] = await connection.execute(query, params);
//     return rows;
//   } catch (error) {
//     throw error;
//   } finally {
//     connection.release();
//   }
// };

// module.exports = dbQuery;