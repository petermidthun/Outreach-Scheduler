//  This reducer holds data necessary to display currently
//  logged in instructor's calendar as a table whether 
//  the table lists program instances or clients.

//  Example object of array: {
//  client_id: 4
//  booking_id: 5
//  instance_id: 12
//  name: "Water"
//  date: "2016-03-25T05:00:00.000Z"
//  instance_id: 12
//  name: "Water"
//  thankyou: true
//  time: "10:00:00"
//  tourorovernight: false
//  van: "Green" }


const instructorCalendarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INSTRUCTOR_CALENDAR_DATA':
            console.log("set_instructor_calendar_data triggered");
            return action.payload;  //  payload is put into state
        case 'UNSET_INSTRUCTOR_CALENDAR_DATA':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  

  export default instructorCalendarReducer;
  