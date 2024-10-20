const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');

router.get('/details', auth.authenticateToken, (req, res, next) => {
  let categoryCount;
  let productCount;
  let billCount;

  let query = "SELECT COUNT(id) as categoryCount FROM category";
  connection.query(query, (err, results) => {
    if (!err) {
      categoryCount = results[0].categoryCount;

      let query2 = "SELECT COUNT(id) as productCount FROM product";
      connection.query(query2, (err, results) => {
        if (!err) {
          productCount = results[0].productCount;

          let query3 = "SELECT COUNT(id) as billCount FROM bill";
          connection.query(query3, (err, results) => {
            if (!err) {
              billCount = results[0].billCount;
              var data = {
                categoryCount: categoryCount,
                productCount: productCount,
                billCount: billCount
              };

              return res.status(200).json(data);
            } else {
              return res.status(500).json(err);
            }
          });
        } else {
          return res.status(500).json(err);
        }
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;