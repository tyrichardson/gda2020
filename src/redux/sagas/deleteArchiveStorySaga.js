import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteArchiveStoryCall(action) {
  console.log('deleteArchiveStoryCall running in deleteArchiveStorySaga', action.payload);
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.delete, `api/writer/allFavorites/${action.payload}`, config)
    console.log("delete all favorites of this story to be deleted ,", action.payload);
    
    yield call(axios.delete, `api/writer/${action.payload}`, config)
    console.log("delete saga axios call:", action.payload);
  
    yield put({
      type: 'GET_WRITER_STORIES_SAGA'
    })
  }
    catch(error){
      console.log('an error occurred in deleteArchiveStoryCall saga:', error);
    }
}

function* deleteArchiveStorySaga() {
  yield takeEvery('DELETE_ARCHIVE_STORY', deleteArchiveStoryCall)
}

export default deleteArchiveStorySaga;