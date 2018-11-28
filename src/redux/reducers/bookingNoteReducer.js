//  Stores the booking_note string/text for a particular client
//  Example state:  {'blah blah blah'}

const bookingNoteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_BOOKING_NOTE':
            console.log("set_booking_note triggered, action.payload: ", action.payload);
            return action.payload;  //  payload is put into state
        case 'UPDATE_BOOKINGNOTE_REDUCER':
            console.log("UPDATE_BOOKINGNOTE_REDUCER triggered, action.payload: ", action.payload)
            return action.payload; 
        case 'UNSET_BOOKING_NOTE':
            return {};              //  state is set to empty array
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default bookingNoteReducer;