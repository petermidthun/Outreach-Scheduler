

const bookingNoteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_BOOKING_NOTE':
            console.log("set_booking_note triggered, action.payload: ", action.payload);
            return action.payload[0];  //  payload is put into state
        case 'UNSET_BOOKING_NOTE':
            return {};              //  state is set to empty array
        default:
            return state;
    }
};
  
  // user will be on the redux state at:
  // state.user
  export default bookingNoteReducer;