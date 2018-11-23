import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProgramming(action) {
    let id=3
   try{
       const response = yield call(axios.get, `/api/instructor/programming/${id}`, {data: action.payload} );
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