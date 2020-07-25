import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getWriterStoriesResponseCall(action) {
  console.log('getWriterStoriesResponceCall running in writerstories saga');
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    const getResponse = yield call(axios.get, '/api/writer', config);
    console.log('getWriterStoriesSaga axiosGET to writerRouter, getResponse:', getResponse);
    yield put({
      type: 'GET_WRITER_STORIES',
      payload: getResponse.data
    })
  } catch (error) {
    console.log('error in getWriterStoriesSaga axios get call', error);
 }
}

function* getWriterStoriesSaga() {
    yield takeEvery('GET_WRITER_STORIES_SAGA', getWriterStoriesResponseCall)
}

export default getWriterStoriesSaga;