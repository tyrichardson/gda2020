import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getZipcodeInfoCall(action) {
    let getResponse;
    let zipcode = action.payload;
    let url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=${zipcode}&lang=United+States`;
    
    console.log('running getZipcodeInfoCall, zipcode: ', zipcode, url);

      getResponse = yield call(axios.get, url);
        console.log('zipcodeStateSaga getResponse ', getResponse);
        yield put({
            type: 'ZIPCODE',
            payload: action.payload
        })
}
    
function* zipcodeStateSaga() {
    yield takeEvery('ZIPCODE', getZipcodeInfoCall)
}

export default zipcodeStateSaga;