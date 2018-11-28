CREATE DATABASE "outreach_database";



CREATE TABLE "users" (         --  holds passwords for all users
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (80) DEFAULT 'instructor'
);

 --  INSTRUCTOR TABLE CANNOT BE CREATED UNTIL USERS ARE REGISTERED AND HAS MANY DEPENDENCIES
 --  REGISTER USERS BEFORE CREATING ADDITIONAL TABLES



CREATE TABLE "clients" (    --  Holds information on clients that might purchase programming
    "client_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "address" VARCHAR (255),
    "site_contact" VARCHAR (255),
    "billing_contact" VARCHAR (255),
    "call_out_information" TEXT
);

INSERT INTO "clients" ("name", "address", "site_contact", "billing_contact", "call_out_information")
VALUES 
('Happy Apple Charter', '10800 Brookings ave, mpls, 55108', 'Angela - 432 555 4334', 'Jaquan - 643 5544 3546', 'call out info'),
('Kitson County', '1555 spruce st, st paul, 55348', 'Alondra - 432 555 4334', 'tank - 643 5544 3546', 'call out info'),
('German Immerson', '2222 pine st, st paul, 55444', 'Vasquez - 432 555 4003', 'myrtle - 643 5544 3006', 'call out info'),
('Saint Anthony Middle', '100 Lincoln st, mpls, 55108', 'Marquis - 432 555 4334', 'Lakeesha - 643 5544 3546', 'call out info');

--  Holds list of instructors and tracks how many hours they have spent presenting programs

CREATE TABLE "instructors" (
    "instructor_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "total_hours" DECIMAL,
    "user_id" INTEGER references users
);

INSERT INTO "instructors" ("name", "total_hours", "user_id")
VALUES 
('Ruiz', 112, 1),
('Jaquan', 115, 2),
('keesha', 55, 3);

--  Holds a list of programs that might be purchased/presented

CREATE TABLE "programs" (
    "program_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255)
);

INSERT INTO "programs" ("name")
VALUES ('Electricity'),('Water'), ('Engineering');

--  Holds a list of vans available to deliver programming 

CREATE TABLE "vans" (
    "van_id" SERIAL PRIMARY KEY,
    "color" VARCHAR (255)
);

INSERT INTO "vans" ("color")
VALUES ('Red'),('Green'), ('Purple'), ('Yellow');

--  Holds a list of bookings for each client
--  One booking may consist of multiple dates and program instances 
--  Resources (vans, intructors, etc) are assigned to dates and program instances.
--  See ERD.

CREATE TABLE "bookings" (
    "booking_id" SERIAL PRIMARY KEY,
    "client_id" INT REFERENCES "clients",
    "booking_note" TEXT,
    "callout" boolean DEFAULT FALSE,    --  has client been called for this booking
    "thankyou" boolean DEFAULT FALSE,   --  has client been thanked after this booking
    "tourorovernight" boolean DEFAULT FALSE   --  is this booking an overnight or regional tour
);

INSERT INTO "bookings" ("client_id", "booking_note", "tourorovernight") 
VALUES (1, 'elec and eng 7am, 9am, 3/23, keesha, Happy Apple', TRUE), (2, 'lots o waters, 4/21+4/22+4/23, Ruiz and Jaquan, kittson', TRUE), (3, 'Eng, 3/11/17 german', FALSE), (3, 'Elec, 3/20/18 german', FALSE), (4, 'water, anthony, 2016', FALSE), (4, 'water, anthony, 2017', FALSE), (4, 'water, anthony, 2018', FALSE);


CREATE TABLE "program_feedback" ( --  holds feedback submitted by instructors
    "feedback_id" SERIAL PRIMARY KEY,
    "program_id" INT REFERENCES "programs",
    "instructor_id" INT REFERENCES "instructors",
    "issue" VARCHAR(255)
);

INSERT INTO "program_feedback" ("program_id", "instructor_id", "issue") 
VALUES (1, 1, 'Giant test tube broke'), (1, 3, 'Out of flame paper' ), 
        (2, 2, 'materials wet' ), (2, 1, 'part 3 demo falls flat' ),
        (3, 3, 'bird train is awesome!' ), (3, 2, 'dont overheat eggs'),
        (1, 2, 'conclusion is too long'), (2, 3, 'needs shortening' );

CREATE TABLE "van_issues" (     --  holds van issues submitted by instrutors
    "issue_id" SERIAL PRIMARY KEY,
    "van_id" INT REFERENCES "vans",
    "instructor_id" INT REFERENCES "instructors",

    "date_submitted" DATE,
    "issue" VARCHAR(255),
    "resolved" Boolean DEFAULT FALSE
);

INSERT INTO "van_issues" ("van_id", "instructor_id", "date_submitted", "issue") 
VALUES (1, 1, '2018-3-22','check engine light'), (1, 3, '2018-3-23', 'brakes squeeking' ), 
        (2, 2, '2018-3-23', 'front left tire low' ), (2, 2, '2018-3-23', 'out of wiper fluid' ), 
        (3, 1, '2018-3-24', 'big scratch, left side' ),(3, 1, '2018-3-24', 'wants oil change' ),
        (4, 2, '2018-04-24', 'cigarette lighter broke'), (4, 2, '2018-04-24', 'gremlin in engine');

--  Holds dates associated with particular bookings

CREATE TABLE "booking_dates" (
    "booking_date_id" SERIAL PRIMARY KEY,
    "booking_id" INT REFERENCES "bookings",
    "date" DATE,
    "van_id" INT REFERENCES "vans"
);

INSERT INTO "booking_dates" ("booking_id", "date", "van_id") 
VALUES (1, '2017-03-23', 1), 
        (2, '2018-04-21', 2), (2, '2018-04-22', 2), (2, '2018-04-23', 4),
        (3, '2017-03-11', 3), (4, '2018-03-20', 3),
        (5, '2016-03-25', 2 ), (6, '2017-04-22', 1 ), (7, '2018-03-22', 1 );

--  Holds program instances associated with particular dates

CREATE TABLE "program_instances" (
    "instance_id" SERIAL PRIMARY KEY,
    "booking_date_id" INT REFERENCES "booking_dates",
    "program_id" INT REFERENCES "programs",
    "instructor_id" INT REFERENCES "instructors",
    "time" TIME,
    "added to calendar" BOOLEAN DEFAULT FALSE
);

INSERT INTO "program_instances" ("booking_date_id", "program_id", "instructor_id", "time", "added to calendar") 
VALUES 
(1, 1, 3, '07:00:00', FALSE ), (1, 3, 3, '09:00:00', FALSE ),
(2, 2, 1, '07:00:00', FALSE ), (2, 2, 1, '09:00:00', FALSE ),
(3, 2, 1, '07:00:00', FALSE ), (3, 2, 1, '09:00:00', FALSE ),
(4, 2, 2, '07:00:00', FALSE ), (4, 2, 2, '09:00:00', FALSE ), (4, 2, 2, '11:00:00', FALSE ),
(5, 3, 3, '09:00:00', FALSE ),
(6, 1, 2, '011:00:00', FALSE ),  
(7, 2, 1, '010:00:00', FALSE ), 
(8, 2, 3, '010:00:00', FALSE ),
(9, 2, 2, '010:00:00', FALSE );


--  Instructor Calendar View
SELECT clients.client_id, bookings.booking_id, program_instances.instance_id, programs.name, booking_dates.date , program_instances.time, clients.name as client, vans.color as van, bookings.callout, bookings.thankyou, bookings.booking_note, bookings.tourorovernight
        FROM program_instances
        JOIN booking_dates ON program_instances.booking_date_id=booking_dates.booking_date_id
        JOIN bookings ON booking_dates.booking_id=bookings.booking_id
        JOIN clients ON bookings.client_id=clients.client_id
        JOIN programs ON program_instances.program_id=programs.program_id
        JOIN vans ON booking_dates.van_id=vans.van_id
        JOIN instructors ON program_instances.instructor_id=instructors.instructor_id
        WHERE instructors.instructor_id = ${instructorid} ORDER BY DATE;

--  Recently visited client        
SELECT clients.client_id, booking_dates.date, instructors.name as instructor_name
    FROM program_instances
    JOIN booking_dates ON program_instances.booking_date_id=booking_dates.booking_date_id
    JOIN instructors ON program_instances.instructor_id=instructors.instructor_id
    JOIN bookings ON booking_dates.booking_id=bookings.booking_id
    JOIN clients ON bookings.client_id=clients.client_id;

--  get booking note based on booking id
    SELECT bookings.booking_id, bookings.booking_note
    FROM bookings
    WHERE bookings.booking_id=${bookingid};

--  get callout info based on client id
    SELECT clients.client_id, clients.call_out_information
    FROM clients
    WHERE clients.client_id=${clientid};

-- puts for callout info and booking note
    UPDATE clients
    SET call_out_information = $1
    WHERE
     client_id=$2;

     UPDATE bookings
     SET booking_note = $1
     WHERE booking_id =$2;

--  Van issues reducer
SELECT DISTINCT  vans.van_id, vans.color, van_issues.issue, van_issues.date_submitted, instructors.name, van_issues.resolved
      FROM bookings 
      JOIN booking_dates ON bookings.booking_id=booking_dates.booking_id
      JOIN vans ON booking_dates.van_id=vans.van_id
      JOIN van_issues ON vans.van_id=van_issues.van_id
      JOIN instructors ON van_issues.instructor_id=instructors.instructor_id
      WHERE bookings.booking_id=${booking_id};