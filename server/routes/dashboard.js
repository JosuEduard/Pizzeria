const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.get('/details', (req, res, next) => {
  let categoryCount;
  let productCount;
  let orderCount;

  let query = "SELECT COUNT(id) as categoryCount FROM category";
  connection.query(query, (err, results) => {
    if (!err) {
      categoryCount = results[0].categoryCount;

      let query2 = "SELECT COUNT(id) as productCount FROM product";
      connection.query(query2, (err, results) => {
        if (!err) {
          productCount = results[0].productCount;

          let query3 = "SELECT COUNT(id) as orderCount FROM orders";
          connection.query(query3, (err, results) => {
            if (!err) {
              orderCount = results[0].orderCount;
              var data = {
                categoryCount: categoryCount,
                productCount: productCount,
                orderCount: orderCount
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