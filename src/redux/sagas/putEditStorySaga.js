//This takes action payload from Edit in Archive page and sends to writer.router.js to update database
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* putEditStoryCall(action) {
  console.log('putEditStoryCall running in putEditStorySaga');
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.put, `/api/writer/${action.payload.id}`, action.payload, config);
    yield put({
      type: 'GET_WRITER_STORIES_SAGA',
    })
   } catch (error) {
      console.log('error coming from putEditStorySaga axios.put call:', error);
  }
}

function* putEditStorySaga(){
  yield takeEvery('EDIT_STORY_PUT', putEditStoryCall)
}

export default putEditStorySaga;