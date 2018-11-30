import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//  This function gets all the program_instances assigned to
//  the logged-in instructor/user and sends them to the 
//  instructorCalendarReducer
function* fetchProgramming(action) {
    console.log("state in fetchProgramming: ")
    let userid= action.id;

   try{
       const response = yield call(axios.get, `/api/instructor/programming/${userid}`, {data: action.payload} );
       yield put({ type: 'SET_INSTRUCTOR_CALENDAR_DATA', payload: response.data})
   }
   catch (error) {
       console.log('error searching for calendar', error);
   }
}

//  This function gets the single booking_note assigned to
//  the booking associated with the provided booking_id and sends
//  it to the bookingNoteReducer
function* fetchBookingNote(action) {
    console.log("state in fetchBookingNote: ")
    let booking_id= action.id;

   try{
       const response = yield call(axios.get, `/api/instructor/bookingnote/${booking_id}`, {data: action.payload} );
       yield put({ type: 'SET_BOOKING_NOTE', payload: response.data})
   }
   catch (error) {
       console.log('error searching for bookingNote', error);
   }
}

//  This function gets the single CalloutInformation string
//  assigned to the client associated with the provied client_id 
//  and sends it to the calloutInformationReducer
function* fetchCalloutInformation(action) {
    console.log("state in fetchCalloutInformation: ")
    let client_id= action.id;

   try{
       const response = yield call(axios.get, `/api/instructor/calloutinformation/${client_id}`, {data: action.payload} );
       yield put({ type: 'SET_CALLOUT_INFORMATION', payload: response.data})
   }
   catch (error) {
       console.log('error searching for calloutInformation', error);
   }
}


//  Makes sure each function runs after the others have completed
//  to prefent asynchronicity (generator function)
function* instructorSaga() {
   yield takeLatest('FETCH_CALENDAR', fetchProgramming);
   yield takeLatest('FETCH_BOOKING_NOTE', fetchBookingNote);
   yield takeLatest('FETCH_CALL_OUT_INFORMATION', fetchCalloutInformation);
 }

export default instructorSaga;
  