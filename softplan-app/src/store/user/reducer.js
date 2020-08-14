import * as Type from './actionsTypes';

const INITIAL_STATE = {
  users: [],
  selectedUser: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case Type.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.data
      }
    }
    case Type.DELETE_USERS_SUCCESS: {
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.id)
      }
    }
    case Type.SAVE_USERS_SUCCESS: {
      return {
        ...state,
        users: [...state.users, action.data]
      }
    }
    case Type.UPDATE_USERS_SUCCESS: {
      return {
        ...state,
        users: [...state.users.filter(u => u.id !== action.data.id), action.data]
      }
    }
    case Type.FETCH_BY_ID_USER: {
      return {
        ...state,
        selectedUser: state.users.filter(u => u.id === action.id)[0]
      }
    }
    case Type.CLEAR_SELECTED_USERS: {
      return {
        ...state,
        selectedUser: null
      } 
    }
    case Type.RESET_USER_STORE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export const getUsers = state => state.rootState.user.users;
export const getSelectedUser = state => state.rootState.user.selectedUser;