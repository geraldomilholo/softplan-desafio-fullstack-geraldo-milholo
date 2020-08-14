import * as Type from './actionsTypes';

const INITAL_STATE = {
  show: false,
  showSucces: false,
  showWarning: false,
  showError: false,
  message: ''
};

export default function (state = INITAL_STATE, action) {
  switch (action.type) {
    case Type.TOAST_MESSAGE_SUCCESS: {
      return {
        show: true,
        showSucces: true,
        showWarning: false,
        showError: false,
        message: action.message
      }
    }
    case Type.TOAST_MESSAGE_WARNING: {
      return {
        show: true,
        showSucces: false,
        showWarning: true,
        showError: false,
        message: action.message
      }
    }
    case Type.TOAST_MESSAGE_ERROR: {
      return {
        show: true,
        showSucces: false,
        showWarning: false,
        showError: true,
        message: action.message
      }
    }
    case Type.TOAST_MESSAGE_CLEAN: {
      return INITAL_STATE;
    }

    default:
      return state;
  }
}

export const getToast = (state) => state.rootState.toast;
