import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//  Primarily for organizational purposes rather than 
//  asynchronicity issues, this file mediates the get 
//  from the server for the clientHistoryReducer


function* fetchClientHistory(action) {
    console.log("in fetchClientHistory: ")

   try{
       const response = yield call(axios.get, `/api/instructor/clienthistory`, {data: action.payload} );
       yield put({ type: 'SET_CLIENT_HISTORY_DATA', payload: response.data})
   }
   catch (error) {
       console.log('error searching for client history', error);
   }
}

function* clientHistorySaga() {
   yield takeLatest('FETCH_CLIENT_HISTORY', fetchClientHistory);
 }

export default clientHistorySaga;