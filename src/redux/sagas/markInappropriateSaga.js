import { call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* markInappropriateCall(action) {
  console.log('put markInappropriateCall running, payload: ', action.payload);
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.put, `/api/writer/markInappropriate/${action.payload.id}`, action.payload, config)
  } catch (error) {
    console.log('error coming from markInappropriate axios.put call',  error)
 }
}

function* toggleInappropriateCall(action) {
  console.log('put toggleInappropriateCall running, payload: ', action.payload);
  const config = {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
  }
  try {
    yield call(axios.put, `/api/writer/inappropriate/${action.payload.id}`, action.payload, config) 
  } catch (error) {
    console.log('error coming from toggleInappropriate axios.put call',  error)
 }
}

function* markInappropriateSaga(){
    yield takeEvery('MARK_INAPPROPRIATE', markInappropriateCall);
    yield takeEvery('TOGGLE_INAPPROPRIATE', toggleInappropriateCall);
  }

export default markInappropriateSaga;