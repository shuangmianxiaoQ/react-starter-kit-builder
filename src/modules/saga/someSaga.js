import { put } from 'redux-saga/effects';
import { someAsyncAction } from '../actions';

export function* someSaga() {
  try {
    const payload = yield fetch('https://www.github.com');

    if (!payload) {
      throw new Error('Error in payload!');
    }

    yield put(someAsyncAction(payload));
  } catch (error) {
    throw new Error('Some error in sagas occured!');
  }
}

export default someSaga;
