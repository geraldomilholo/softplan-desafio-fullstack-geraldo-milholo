import * as Type from './actionsTypes';

const messageSuccess = ({ message }) => ({ type: Type.TOAST_MESSAGE_SUCCESS,  message });

const messageWarning = ({ message }) => ({ type: Type.TOAST_MESSAGE_WARNING,  message });

const messageError = ({ message }) => ({ type: Type.TOAST_MESSAGE_ERROR,  message });

const messageClean = () => ({ type: Type.TOAST_MESSAGE_CLEAN });

export {
  messageSuccess,
  messageWarning,
  messageError,
  messageClean
}