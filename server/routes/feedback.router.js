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

  router.put('/bookingnote', (req, res) => {
    console.log("in put at bookingnote")
      const body = req.body;
    console.log("req.body: ", body)
      const queryText = `UPDATE bookings
      SET booking_note = $1
      WHERE booking_id =$2;`;
    
      const queryValues = [
          body.booking_note,
          body.booking_id,
      ];
    
      pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(200); })
        .catch((err) => {
          console.log('Error updating booking note information', err);
          res.sendStatus(500);
        });
    });


    router.get(`/vansissues/:id`, (req, res) => {
      console.log("in get at /vansissues")
      const booking_id = req.params.id;
      const queryText = `SELECT DISTINCT  vans.van_id, vans.color, van_issues.issue, van_issues.date_submitted, instructors.name, van_issues.resolved
      FROM bookings 
      JOIN booking_dates ON bookings.booking_id=booking_dates.booking_id
      JOIN vans ON booking_dates.van_id=vans.van_id
      JOIN van_issues ON vans.van_id=van_issues.van_id
      JOIN instructors ON van_issues.instructor_id=instructors.instructor_id
      WHERE bookings.booking_id=${booking_id};`;
      pool.query(queryText)
  
          .then((result) => {
              console.log("result.rows: ", result.rows);
              res.send(result.rows);
          })
          .catch((err) => {
              console.log('Error completing calendar query', err);
              res.sendStatus(500);
          });
  });
  

module.exports = router;