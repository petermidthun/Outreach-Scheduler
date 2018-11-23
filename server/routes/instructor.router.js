const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get(`/programming/:id`, (req, res) => {
    console.log("in get at /programming")
    const instructorid = req.params.id;
    const queryText = `SELECT programs.name, booking_dates.date, program_instances.time, clients.name, vans.color as van, bookings.callout, bookings.thankyou, bookings.booking_note, bookings.touron
        FROM program_instances 
        JOIN booking_dates ON program_instances.booking_date_id=booking_dates.booking_date_id
        JOIN bookings ON booking_dates.booking_id=bookings.booking_id
        JOIN clients ON bookings.client_id=clients.client_id
        JOIN programs ON program_instances.program_id=programs.program_id
        JOIN vans ON booking_dates.van_id=vans.van_id
        JOIN instructors ON program_instances.instructor_id=instructors.instructor_id
        WHERE instructors.instructor_id = ${instructorid} ORDER BY DATE;`;
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;