import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* postStoryCall(action) {
  console.log('postStoryCall running in postSaga');

  let zipResponse;
  let zipcode = action.payload.zipcode;
  let url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipcode}&lang=United+States`;

  console.log('postStoryCall zipcode: ', zipcode, url);

  zipResponse = yield call(axios.get, url);
  console.log('zipcodeStateSaga zipResponse ', zipResponse);
  let lat = zipResponse.data.records[0].fields.latitude;
  let long = zipResponse.data.records[0].fields.longitude;

  action.payload.lat = lat;
  action.payload.long = long;
  console.log('zipcode lat and long ', action.payload);

  //below here is the post for newStory and zipcode
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