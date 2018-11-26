import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';




function* updateCalloutInformation(action) {
    console.log("in updateCalloutInformation: ")
    console.log('payload should be: ', action.payload)
    try {
        yield call(axios.put, '/api/feedback/calloutinformation', action.payload);
        yield put({ type: 'UPDATE_CALLOUTINFORMATION_REDUCER', payload: action.payload });
      }
      catch (error) {
        console.log('error with postPlant get request', error);
      }
   
}

function* updateBookingNote(action) {
    console.log("in updateBookingNote")
    try {
      yield call(axios.put, '/api/feedback/bookingnote', action.payload);
      yield put({ type: 'UPDATE_BOOKINGNOTE_REDUCER', payload: action.payload });
    }
    catch (error) {
      console.log('error with postPlant get request', error);
    }
}

function* feedbackSaga() {
   yield takeLatest('UPDATE_CALLOUT_INFORMATION', updateCalloutInformation);
   yield takeLatest('UPDATE_BOOKING_NOTE', updateBookingNote);
 }

export default feedbackSaga;