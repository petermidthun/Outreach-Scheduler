//  This reducer holds data necessary to display currently
//  logged in instructor's calendar as a table whether 
//  the table lists program instances or clients.

//  Example object of array: {
//  program: 'water'
//  date: '2018-11-02'
//  time: '11:00:00'
//  client: 'Best School'
//  van: 'yellow'
//  called_out:  FALSE
//  thank_you:   FALSE
//  booking_note: 'Lots of good stuff'
//  TourON:     FALSE   }


const instructorCalendarTableReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TABLE_DATA':
            return action.payload;  //  payload is put into state
        case 'UNSET_TABLE_DATA':
            return [];              //  state is set to empty array
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default instructorCalendarTableReducer;
  