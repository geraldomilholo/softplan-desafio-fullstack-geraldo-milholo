import * as Type from './actionsTypes';

const INITIAL_STATE = {
  processes: [],
  selectedProcess: null
};

const sort = (a, b) => {
  if (a.name > b.name) return 1;
  else if (a.name < b.name) return -1;
  return 0;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Type.FETCH_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: action.data
      }
    }
    case Type.DELETE_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: state.processes.filter(p => p.id !== action.id)
      }
    }
    case Type.SAVE_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: [...state.processes, action.data].sort(sort)
      }
    }
    case Type.UPDATE_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: [...state.processes.filter(p => p.id !== action.data.id), action.data].sort(sort)
      }
    }
    case Type.FETCH_BY_ID_PROCESSES_SUCCESS: {
      return {
        ...state,
        selectedProcess: action.data
      }
    }
    case Type.CLEAR_SELECTED_PROCESSES: {
      return {
        ...state,
        selectedProcess: null
      } 
    }
    case Type.RESET_PROCESS_STORE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export const getProcesses = state => state.rootState.process.processes;
export const getSelectedProcess = state => state.rootState.process.selectedProcess;