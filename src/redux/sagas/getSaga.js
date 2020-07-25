import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getResponseCall(action) {
  try {
    const getResponse = yield call(axios.get, '/api/reader');
    console.log('getSaga axios.get sent to readerRouter:', getResponse);
    yield put({
      type: 'GET_RESPONSE_REDUCER',
      payload: getResponse.data
    })
  } catch (error) {
    console.log('error in getSaga axios get call', error);
 }
}

function* getSaga() {
    yield takeEvery('GET_STORIES', getResponseCall)
}

export default getSaga;