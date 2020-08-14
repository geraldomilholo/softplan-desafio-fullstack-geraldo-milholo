import * as Type from './actionsTypes';

const fetchUsers = () => ({ type: Type.FETCH_USERS });

const deleteUser = id => ({ type: Type.DELETE_USERS, id });

const saveUser = data => ({ type: Type.SAVE_USERS, data });

const getUserById = id => ({ type: Type.FETCH_BY_ID_USER, id });

const clearUserSelected = () => ({ type: Type.CLEAR_SELECTED_USERS });

const updateUser = (id, data) => ({ type: Type.UPDATE_USERS, id, data});

const clearUserStore = () => ({ type: Type.RESET_USER_STORE });

export {
  fetchUsers,
  deleteUser,
  saveUser,
  getUserById,
  clearUserSelected,
  updateUser,
  clearUserStore
}
