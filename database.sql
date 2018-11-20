CREATE DATABASE "outreach_database";

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "type" VARCHAR (80) DEFAULT 'instructor'
);

 --  INSTRUCTOR TABLE CANNOT BE ENTERED UNTIL USERS ARE REGISTERED AND HAS MANY DEPENDENCIES
 --  REGISTER THREE USERS BEFORE CREATING ADDITIONAL TABLES

CREATE TABLE "clients" (
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
('Saint Anthony Middle', '1080 Lincoln st, mpls, 55108', 'Marquis - 432 555 4334', 'Lakeesha - 643 5544 3546', 'call out info'),
('Kitson County', '1555 spruce st, st paul, 55348', 'Alondra - 432 555 4334', 'tank - 643 5544 3546', 'call out info');

CREATE TABLE "instructors" (
    "instructor_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255),
    "total_hours" DECIMAL,
    "user_id" INTEGER references users
);

INSERT INTO "instructors" ("name", "total_hours", "user_id")
VALUES 
('Peter', 112, 1),
('Sue', 115, 2),
('keesha', 55, 3);

CREATE TABLE "programs" (
    "program_id" SERIAL PRIMARY KEY,
    "name" VARCHAR (255)
);

INSERT INTO "programs" ("name")
VALUES ('Electricity'),('Water'), ('Engineering');


CREATE TABLE "vans" (
    "program_id" SERIAL PRIMARY KEY,
    "color" VARCHAR (255)
);

INSERT INTO "vans" ("color")
VALUES ('Red'),('Green'), ('Purple');

CREATE TABLE "bookings" (
    "booking_id" SERIAL PRIMARY KEY,
    "client_id" INT REFERENCES "clients",
    "booking_note" TEXT,
    "callout" boolean DEFAULT FALSE,
    "thankyou" boolean DEFAULT FALSE
);

INSERT INTO "bookings" ("client_id", "booking_note", "callout", "thankyou") 
VALUES (1, 'Big paragraphs here', FALSE, FALSE), (1, 'big paragraphs', FALSE, FALSE), (2, 'big paragraphs', FALSE, FALSE), (2, 'booking notes', FALSE, FALSE), (3, 'more notes', FALSE, FALSE), (3, 'booking notes', FALSE, FALSE), (2, 'more booking notes', FALSE, FALSE);



CREATE TABLE "previous_visits" (
    "visit_id" SERIAL PRIMARY KEY,
    "client_id" INT REFERENCES "clients",
    "instructor_id" INT REFERENCES "instructors",
    "date" DATE
);

INSERT INTO "previous_visits" ("client_id", "instructor_id", "date") 
VALUES (1, 1, '2017-03-22'), (1, 3, '2018-04-22' ), 
        (2, 2, '2017-03-02' ), (2, 1, '2018-03-12' ),
        (3, 3, '2017-03-25' ), (3, 2, '2018-04-22' ),
        (1, 2, '2016-03-22' ), (2, 3, '2016-03-22' );


CREATE TABLE "program_feedback" (
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

CREATE TABLE "van_issues" (
    "issue_id" SERIAL PRIMARY KEY,
    "van_id" INT REFERENCES "vans",
    "instructor_id" INT REFERENCES "instructors",
    "date_submitted" DATE,
    "issue" VARCHAR(255),
    "resolved" Boolean DEFAULT FALSE
);

INSERT INTO "van_issues" ("van_id", "instructor_id", "date_submitted", "issue") 
VALUES (1, 1, '2018-3-22','check engine light'), (1, 3, '2018-3-23', 'brakes squeeking' ), 
        (2, 2, '2018-3-23', 'front left tire low' ), (3, 1, '2018-3-24', 'big scratch, left side' );

CREATE TABLE "booking_dates" (
    "booking_date_id" SERIAL PRIMARY KEY,
    "booking_id" INT REFERENCES "bookings",
    "date" DATE
);

INSERT INTO "booking_dates" ("booking_id", "date") 
VALUES (1, '2017-03-23' ), (1, '2018-04-21'), (1, '2018-04-22' ), (1, '2018-04-23' ),
        (2, '2017-03-11' ), (2, '2018-03-20' ),
        (3, '2016-03-25' ), (3, '2017-04-22' ), (3, '2018-03-22' );

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
(8, 2, 2, '010:00:00', FALSE );


CREATE TABLE "van_bookings" (
    "van_booking_id" SERIAL PRIMARY KEY,
    "booking_date_id" INT REFERENCES "booking_dates",
    "van_id" INT REFERENCES "vans"
);

INSERT INTO "van_bookings" ("booking_date_id", "van_id") 
VALUES (1, 1 ), (2, 2), (3, 2 ), (4, 2 ),
        (5, 3 ), (6, 3 ),
        (7, 2 ), (8, 1 ), (9, 1 );