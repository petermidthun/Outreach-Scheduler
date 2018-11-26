import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';


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



function* instructorSaga() {
   yield takeLatest('FETCH_CALENDAR', fetchProgramming);
   yield takeLatest('FETCH_BOOKING_NOTE', fetchBookingNote);
   yield takeLatest('FETCH_CALL_OUT_INFORMATION', fetchCalloutInformation);
 }

export default instructorSaga;
  