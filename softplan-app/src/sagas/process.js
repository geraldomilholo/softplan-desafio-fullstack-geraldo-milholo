/* eslint-disable no-console */
import { takeLatest, put } from 'redux-saga/effects';
import * as TypeActions from '../store/process/actionsTypes';
import ProcessService from '../services/ProcessService';
import * as ToastTypeActions from '../store/toast/actionsTypes';

function* load() {
  try {
    yield console.log('load process');
    const response = yield ProcessService.find();
    yield put({
      type: TypeActions.FETCH_PROCESSES_SUCCESS,
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

function* findById({ id }) {
  try {
    yield console.log('load one');
    const response = yield ProcessService.findById(id);
    yield put({
      type: TypeActions.FETCH_BY_ID_PROCESSES_SUCCESS,
      data: response.data
    });

  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao carregar as informações do processo!'
    });
  }
}

function* save({ data }) {
  try {
    yield console.log('save process');
    const response = yield ProcessService.save(data);
    yield put({
      type: TypeActions.SAVE_PROCESSES_SUCCESS,
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
    const response = yield ProcessService.update(id, data);
    yield put({
      type: TypeActions.UPDATE_PROCESSES_SUCCESS,
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
    yield ProcessService.delete(id);
    yield put({
      type: TypeActions.DELETE_PROCESSES_SUCCESS,
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
  yield takeLatest(TypeActions.FETCH_PROCESSES, load);
  yield takeLatest(TypeActions.FETCH_BY_ID_PROCESSES, findById);
  yield takeLatest(TypeActions.SAVE_PROCESSES, save);
  yield takeLatest(TypeActions.UPDATE_PROCESSES, update);
  yield takeLatest(TypeActions.DELETE_PROCESSES, deleteProcess);
}