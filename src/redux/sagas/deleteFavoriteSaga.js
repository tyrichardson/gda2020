import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteFavoriteCall(action) {
  console.log('deleteFavoriteCall running in deleteFavoriteSaga');
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
      console.log('an error occurred in deleteFavoriteCall saga:', error);
    }
}

function* deleteFavoriteSaga() {
  yield takeEvery('DELETE_FAVORITE', deleteFavoriteCall)
}

export default deleteFavoriteSaga;