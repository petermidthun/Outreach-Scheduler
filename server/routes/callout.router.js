const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


  router.put('/calloutcompleted/:id', (req, res) => {
    console.log("in put at calloutcompleted")
      const booking_id = req.params.id;
    
      const queryText = `UPDATE bookings
      SET callout = TRUE
      WHERE booking_id =$1;`;
    
      const queryValues = [
          booking_id,
      ];
    
      pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); 
        console.log("successful calloutcompleted put")
      })
        .catch((err) => {
          console.log('Error updating booking note information', err);
          res.sendStatus(500);
        });
    });

    module.exports = router;