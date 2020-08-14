import { all } from 'redux-saga/effects';
import watchProcess from './process';
import watchAuth from './auth';
import watchUser from './user'

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchProcess(),
    watchUser()
  ])
}