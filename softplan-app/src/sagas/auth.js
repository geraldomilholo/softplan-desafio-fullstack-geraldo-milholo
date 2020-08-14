/* eslint-disable no-console */
import { takeLatest, put } from 'redux-saga/effects';
import * as TypeActions from '../store/auth/actionsTypes';
import * as UsersTypeActions from '../store/user/actionsTypes';
import AuthService from '../services/AuthService';
import * as ToastTypeActions from '../store/toast/actionsTypes';
import * as LoaderTypeActions from '../store/loader/actionsTypes';

function * login({ authData, history }) {
  try {
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    yield console.log('login');
    const response = yield AuthService.login(authData);
    yield put({
      type: TypeActions.FETCH_AUTH_SUCCESS,
      data: response.data
    });

    yield put({ type: UsersTypeActions.FETCH_USERS });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });

    history.push('/processos');
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao logar'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

export default function * watchAuth() {
  yield takeLatest(TypeActions.FETCH_AUTH, login);
}