import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteArchiveFavoriteCall(action) {
  console.log('deleteArchiveFavoriteCall running in deleteArchiveFavoriteSaga');
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.delete, `api/writer/favorite/${action.payload.id}`, config)
    console.log("delete favorite saga axios call:", action.payload);
    yield put({
      type: 'GET_FAVORITES'
    })
  }
    catch(error){
      console.log('an error occurred in deleteArchiveFavoriteCall saga:', error);
    }
}

function* deleteArchiveFavoriteSaga() {
  yield takeEvery('DELETE_ARCHIVE_FAVORITE', deleteArchiveFavoriteCall)
}

export default deleteArchiveFavoriteSaga;