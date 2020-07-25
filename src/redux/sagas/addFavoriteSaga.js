import { call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addFavoriteCall(action) {
  console.log('postFavoriteCall running in addFavoriteSaga action.payload:', action.payload);
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.post, '/api/writer/fav', action.payload, config) 
  } catch (error) {
    console.log('error coming from addFavoriteSaga axios.post call',  error)
 }
}

function* addFavoriteSaga() {
  yield takeEvery('ADD_FAVORITE', addFavoriteCall)
}

export default addFavoriteSaga;