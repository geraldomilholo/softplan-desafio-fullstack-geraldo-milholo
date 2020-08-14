import * as Type from './actionsTypes';

const INITAL_STATE = {
  token: null,
  role: null
};

export default function (state = INITAL_STATE, action) {
  switch (action.type) {
    case Type.FETCH_AUTH_SUCCESS: {
      return {
        ...state,
        ...action.data
      }
    }
    case Type.AUTH_RESET_STORE: {
      return {
        ...state,
        ...action.data
      }
    }
    default:
      return state;
  }
}

export const getAuth = state => state.rootState.auth;
export const getRole = state => state.rootState.auth.role;
