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

function* instructorSaga() {
   yield takeLatest('FETCH_CALENDAR', fetchProgramming);


 }

export default instructorSaga;
  