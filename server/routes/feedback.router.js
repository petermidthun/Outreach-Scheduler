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
      const queryText = `SELECT DISTINCT van_issues.issue_id, vans.van_id, vans.color, van_issues.issue, van_issues.date_submitted, instructors.name, van_issues.resolved
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
  
  router.get(`/programfeedback/:id`, (req, res) => {
    console.log("in get at /vansissues")
    const booking_id = req.params.id;
    const queryText = `SELECT DISTINCT  program_feedback.feedback_id, programs.program_id, programs.name, program_feedback.feedback, instructors.name as instructor_name
    FROM bookings 
    JOIN booking_dates ON bookings.booking_id=booking_dates.booking_id
    JOIN program_instances ON booking_dates.booking_date_id=program_instances.booking_date_id
    JOIN programs ON program_instances.program_id=programs.program_id
    JOIN program_feedback ON programs.program_id=program_feedback.program_id
    JOIN instructors ON program_feedback.instructor_id=instructors.instructor_id
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

router.post('/instructoraddvanissue', (req, res) => {
  const newVanIssueObject = req.body;
  console.log('newVanIssueObject being sent to server: ', newVanIssueObject);
  const queryText = `INSERT INTO "van_issues" ("instructor_id", "van_id",  "issue")
  VALUES ($1, $2, $3)`;
  const queryValues = [
    newVanIssueObject.instructor_id,
    newVanIssueObject.van_id,
    //newVanIssueObject.date,
    newVanIssueObject.issue,
  ];
  pool.query(queryText, queryValues)
    .then(() => { 
        res.sendStatus(201); 
      })
    .catch((err) => {
      console.log('Error in post to van issue database query', err);
      res.sendStatus(500);
    });
});



router.post('/instructoraddProgramFeedback', (req, res) => {
  const newProgramFeedbackObject = req.body;
  console.log('newProgramFeedbackObject being sent to server: ', newProgramFeedbackObject);
  const queryText = `INSERT INTO "program_feedback" ("instructor_id", "program_id", "feedback")
  VALUES ($1, $2, $3)`;
  const queryValues = [
    newProgramFeedbackObject.instructor_id,
    newProgramFeedbackObject.program_id,
    newProgramFeedbackObject.feedback,
  ];
  pool.query(queryText, queryValues)
    .then(() => { 
        res.sendStatus(201); 
      })
    .catch((err) => {
      console.log('Error in post to portfolio database query', err);
      res.sendStatus(500);
    });
});

  //  DELETE VAN ISSUE FROM SERVER
  router.delete(`/vanissue`, (req, res) => {
    console.log("req.query.id: ", req.query.id);
    const queryText = 'DELETE FROM van_issues WHERE issue_id=$1';
    pool.query(queryText, [req.query.id])
      .then(() => { res.sendStatus(200); })
      .catch((err) => {
        console.log('Error deleting a van issue: ', err);
        res.sendStatus(500);
      });
  });

 //  DELETE VAN ISSUE FROM SERVER
 router.delete(`/programfeedback`, (req, res) => {
  console.log("req.query.id: ", req.query.id);
  const queryText = 'DELETE FROM program_feedback WHERE feedback_id=$1';
  pool.query(queryText, [req.query.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error deleting a van issue: ', err);
      res.sendStatus(500);
    });
}); 


router.put('/feedbackcompleted/:id', (req, res) => {
  console.log("in put at calloutcompleted")
    const booking_id = req.params.id;
  
    const queryText = `UPDATE bookings
    SET feedback = TRUE
    WHERE booking_id =$1;`;
  
    const queryValues = [
        booking_id,
    ];
  
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(200); 
      console.log("successful feedbackcompleted put")
    })
      .catch((err) => {
        console.log('Error updating booking note information', err);
        res.sendStatus(500);
      });
  });


module.exports = router;