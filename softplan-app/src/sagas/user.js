/* eslint-disable no-console */
import { takeLatest, put } from 'redux-saga/effects';
import * as TypeActions from '../store/user/actionsTypes';
import UserService from '../services/UserService';
import * as ToastTypeActions from '../store/toast/actionsTypes';

function* load() {
  try {
    yield console.log('load process');
    const response = yield UserService.find();
    yield put({
      type: TypeActions.FETCH_USERS_SUCCESS,
      data: response.data
    });

  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao carregar os processos!'
    });
  }
}

function* save({ data }) {
  try {
    yield console.log('save process');
    const response = yield UserService.save(data);
    yield put({
      type: TypeActions.SAVE_USERS_SUCCESS,
      data: response.data
    });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo salvo com sucesso!'
    });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao salvar o processo!'
    });
  }
}

function* update({ id, data }) {
  try {
    yield console.log('save process');
    const response = yield UserService.update(id, data);
    yield put({
      type: TypeActions.UPDATE_USERS_SUCCESS,
      data: response.data
    });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo salvo com sucesso!'
    });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao salvar o processo!'
    });
  }
}

function* deleteProcess({ id }) {
  try {
    yield console.log('delete process');
    yield UserService.delete(id);
    yield put({
      type: TypeActions.DELETE_USERS_SUCCESS,
      id
    });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo deletado com sucesso!'
    });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Erro ao deletar o processo!'
    });
  }
}

export default function* watchAuth() {
  yield takeLatest(TypeActions.FETCH_USERS, load);
  yield takeLatest(TypeActions.SAVE_USERS, save);
  yield takeLatest(TypeActions.UPDATE_USERS, update);
  yield takeLatest(TypeActions.DELETE_USERS, deleteProcess);
}