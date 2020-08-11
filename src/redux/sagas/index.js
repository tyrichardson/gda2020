import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import addFavoriteSaga from './addFavoriteSaga';
import deleteFavoriteSaga from './deleteFavoriteSaga';
import deleteArchiveStorySaga from './deleteArchiveStorySaga';
import getFavoriteSaga from './getFavoritesSaga';
import getSaga from './getSaga';
import getWriterStoriesSaga from './getWriterStoriesSaga';
import postSaga from './postSaga';
import putEditStorySaga from './putEditStorySaga';
import markInappropriateSaga from './markInappropriateSaga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    addFavoriteSaga(),
    deleteFavoriteSaga(),
    deleteArchiveStorySaga(),
    getFavoriteSaga(),
    getSaga(),
    getWriterStoriesSaga(),
    postSaga(),
    putEditStorySaga(),
    markInappropriateSaga(),
  ]);
}
