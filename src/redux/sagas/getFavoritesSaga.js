
//This runs when archive page mounts to populate writer's list a stories marked as favorites.
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getFavoritesResponseCall(action) {
  console.log('getFavoritesResponceCall running in getFavoritesSaga');
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    const getResponse = yield call(axios.get, '/api/writer/favorites', config);
    console.log('getFavoritesSaga axiosGET to writerRouter, getResponse:', getResponse);
    yield put({
      type: 'GET_WRITER_FAVORITES',
      payload: getResponse.data
    })
  } catch (error) {
    console.log('error in getFavoritesSaga axios get call', error);
 }
}

function* getFavoritesSaga() {
    yield takeEvery('GET_FAVORITES', getFavoritesResponseCall)
}

export default getFavoritesSaga;