import * as Type from './actionsTypes';

const fetchProcesses = () => ({ type: Type.FETCH_PROCESSES });

const deleteProcess = id => ({ type: Type.DELETE_PROCESSES, id });

const saveProcess = data => ({ type: Type.SAVE_PROCESSES, data });

const getProcessById = id => ({ type: Type.FETCH_BY_ID_PROCESSES, id });

const clearProcessSelected = () => ({ type: Type.CLEAR_SELECTED_PROCESSES });

const updateProcess = (id, data) => ({ type: Type.UPDATE_PROCESSES, id, data});

const resetProcessStore = () => ({ type: Type.RESET_PROCESS_STORE });

export {
  fetchProcesses,
  deleteProcess,
  saveProcess,
  getProcessById,
  clearProcessSelected,
  updateProcess,
  resetProcessStore
}
