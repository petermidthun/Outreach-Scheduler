const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.put('/calloutinformation', (req, res) => {
  console.log("in put at calloutinformation")
    const body = req.body;
  console.log("req.body: ", body)
    const queryText = `UPDATE clients
    SET call_out_information = $1
    WHERE
     client_id=$2;`;
  
    const queryValues = [
        body.call_out_information,
        body.client_id,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error updating call out information', err);
        res.sendStatus(500);
      });
  });

module.exports = router;