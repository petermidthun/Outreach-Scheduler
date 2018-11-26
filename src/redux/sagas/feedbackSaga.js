import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';


// //  POST PLANT TO THE SERVER (normally then update state, but not in this case)
// function* postPlant(action) {
//     console.log('in postPlants, action.payload: ', action.payload);
//     try {
//       yield call(axios.post, '/api/plant', action.payload);
//       //  HERE WE WOULD NORMALLY UPDATE STATE THROUGH THE REDUCER (SEE NOTE BELOW)
//     }
//     catch (error) {
//       console.log('error with postPlant get request', error);
//     }
//   }



function* updateCalloutInformation(action) {
    console.log("in updateCalloutInformation: ")
    console.log('payload should be: ', action.payload)
    try {
        yield call(axios.post, '/api/feedback/calloutinformation', action.payload);
        yield put({ type: 'UPDATE_CALLOUTINFORMATION_REDUCER', payload: action.payload });
      }
      catch (error) {
        console.log('error with postPlant get request', error);
      }
   
}

function* updateBookingNote(action) {
    console.log("in updateBookingNote")
//     let booking_id= action.id;

//    try{
//        const response = yield call(axios.get, `/api/feedback/bookingnote`, {data: action.payload} );
//        yield put({ type: 'SET_BOOKING_NOTE', payload: response.data})
//    }
//    catch (error) {
//        console.log('error searching for bookingNote', error);
//    }
}

function* feedbackSaga() {
   yield takeLatest('UPDATE_CALLOUT_INFORMATION', updateCalloutInformation);
   yield takeLatest('UPDATE_BOOKING_NOTE', updateBookingNote);
 }

export default feedbackSaga;