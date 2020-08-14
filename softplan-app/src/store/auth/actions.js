import * as Type from './actionsTypes';

const login = (authData, history) => ({ type: Type.FETCH_AUTH, authData, history });

const resetAuthStore = () => ({ type: Type.AUTH_RESET_STORE })

export {
  login,
  resetAuthStore
}