const dbConfig = require("../db-config");
const db = dbConfig.dbConnection();
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createComment = (req, res, next) => {
  const { postId, comment_text } =  req.body;
  const decodedBearerToken = jwt.verify(req.cookies.bearerToken, process.env.JWT_SECRET); 
  const sql = `INSERT INTO comments (comment_postId, comment_text, comment_userId) VALUES (?, ?, ?)`;
  db.query(sql, postId, comment_text, decodedBearerToken.user_id,  (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getAllComment = (req, res, next) => {
  const sql = `SELECT * FROM comments c, users u WHERE u.user_id=c.comment_userId AND c.comment_postId =? ORDER BY comment_time ASC`;
  db.query(sql, req.params.id, (err, result) => {
    if (result){
    res.status(200).json(result);
    }
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
  });
};

exports.deleteComment = (req, res, next) => {
  const decodedBearerToken = jwt.verify(req.cookies.bearerToken, process.env.JWT_SECRET);
  let sql = null;
  decodedBearerToken.user_id == 36 ? // the admin's user_id is 36
  sql = `DELETE FROM comments WHERE comment_id =?`
  :
  sql = `DELETE FROM comments WHERE comment_id =? AND  comment_userId =?` 
  db.query(sql, req.params.id, decodedBearerToken.user_id, (err, result) => {
    if (result){
    if (result.affectedRows==1){
    res.status(200).json(result);
    }
    if (result.affectedRows==0){  
    res.status(401).json(result);
    }
    }
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
  });
};

exports.modifyComment = (req, res, next) => {
  const decodedBearerToken = jwt.verify(req.cookies.bearerToken, process.env.JWT_SECRET);
  let sql = null;
  const { comment_text} =  req.body;
  const dataWithQuotationMark = "'" + comment_text + "'"
  decodedBearerToken.user_id == 36 ? // the admin's user_id is 36
  sql = `UPDATE comments SET comment_text =? WHERE comment_id =?`  
  :
  sql = `UPDATE comments SET comment_text =? WHERE comment_id =? AND  comment_userId =?`  
  db.query(sql, dataWithQuotationMark, req.params.id, decodedBearerToken.user_id, (err, result) => {
    if (result){
      res.status(200).json(result);
    }
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
  });
};