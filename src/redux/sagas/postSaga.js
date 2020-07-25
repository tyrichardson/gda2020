import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postStoryCall(action) {
  console.log('postStoryCall running in postSaga');
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.post, '/api/writer', action.payload, config)
    yield put({
      type: 'GET_STORIES',
    })
  } catch (error) {
    console.log('error coming from postSaga axios.post call',  error)
 }
}

function* postSaga() {
  yield takeEvery('POST_STORY', postStoryCall)
}

export default postSaga;