/* eslint-disable no-console */
import { takeLatest, put } from 'redux-saga/effects';
import * as TypeActions from '../store/process/actionsTypes';
import ProcessService from '../services/ProcessService';
import * as ToastTypeActions from '../store/toast/actionsTypes';
import * as LoaderTypeActions from '../store/loader/actionsTypes';

function* load() {
  try {
    yield console.log('load process');
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    const response = yield ProcessService.find();
    yield put({
      type: TypeActions.FETCH_PROCESSES_SUCCESS,
      data: response.data
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });

  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao carregar os processos!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

function* findById({ id }) {
  try {
    yield console.log('load one');
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    const response = yield ProcessService.findById(id);
    yield put({
      type: TypeActions.FETCH_BY_ID_PROCESSES_SUCCESS,
      data: response.data
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });

  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao carregar as informações do processo!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

function* save({ data }) {
  try {
    yield console.log('save process');
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    const response = yield ProcessService.save(data);
    yield put({
      type: TypeActions.SAVE_PROCESSES_SUCCESS,
      data: response.data
    });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo salvo com sucesso!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao salvar o processo!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

function* update({ id, data }) {
  try {
    yield console.log('save process');
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    yield ProcessService.update(id, data);
    yield put({ type: TypeActions.FETCH_PROCESSES });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo salvo com sucesso!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_ERROR,
      message: 'Erro ao salvar o processo!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

function* deleteProcess({ id }) {
  try {
    yield console.log('delete process');
    yield put({ type: LoaderTypeActions.LOADER_SHOW });
    yield ProcessService.delete(id);
    yield put({
      type: TypeActions.DELETE_PROCESSES_SUCCESS,
      id
    });
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Processo deletado com sucesso!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  } catch (error) {
    yield console.log(error);
    yield put({
      type: ToastTypeActions.TOAST_MESSAGE_SUCCESS,
      message: 'Erro ao deletar o processo!'
    });
    yield put({ type: LoaderTypeActions.LOADER_HIDE });
  }
}

export default function* watchAuth() {
  yield takeLatest(TypeActions.FETCH_PROCESSES, load);
  yield takeLatest(TypeActions.FETCH_BY_ID_PROCESSES, findById);
  yield takeLatest(TypeActions.SAVE_PROCESSES, save);
  yield takeLatest(TypeActions.UPDATE_PROCESSES, update);
  yield takeLatest(TypeActions.DELETE_PROCESSES, deleteProcess);
}