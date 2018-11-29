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
        console.log('error with calloutinfo get request', error);
      }
   
}

function* updateBookingNote(action) {
    console.log("in updateBookingNote")
    try {
      yield call(axios.put, '/api/feedback/bookingnote', action.payload);
      yield put({ type: 'UPDATE_BOOKINGNOTE_REDUCER', payload: action.payload });
    }
    catch (error) {
      console.log('error with bookingnote get request', error);
    }
}

function* fetchVansIssues(action) {
  console.log("entered fetchVansIssues function in feedbackSaga")
  let booking_id= action.booking_id;
  console.log("booking id: ", booking_id)
  try {
    //  query server
    const response = yield call(axios.get, `/api/feedback/vansissues/${booking_id}`, action.payload);
    //  Set reducer
    yield put({ type: 'SET_VANS_ISSUES_REDUCER', payload: response });
  }
  catch (error) {
    console.log('error with vanissues get request', error);
  }
}

function* fetchProgramFeedback(action) {
  console.log("entered fetchProgramFeedback function in feedbackSaga")
  let booking_id= action.booking_id;
  console.log("booking id: ", booking_id)
  try {
    //  query server
    const response = yield call(axios.get, `/api/feedback/programfeedback/${booking_id}`, action.payload);
    //  Set reducer
    yield put({ type: 'SET_PROGRAM_FEEDBACK_REDUCER', payload: response });
  }
  catch (error) {
    console.log('error with vanissues get request', error);
  }
}

//  Makes sure each function runs after the others have completed
//  to prefent asynchronicity (generator function)
function* feedbackSaga() {
   yield takeLatest('UPDATE_CALLOUT_INFORMATION', updateCalloutInformation);
   yield takeLatest('UPDATE_BOOKING_NOTE', updateBookingNote);
   yield takeLatest('FETCH_VANS_ISSUES', fetchVansIssues);
   yield takeLatest('FETCH_PROGRAM_FEEDBACK', fetchProgramFeedback);
 }

export default feedbackSaga;