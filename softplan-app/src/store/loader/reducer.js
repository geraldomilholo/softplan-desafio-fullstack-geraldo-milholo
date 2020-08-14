import * as Type from './actionsTypes';

const INITAL_STATE = {
  loading: false
};

export default function (state = INITAL_STATE, action) {
  switch (action.type) {
    case Type.LOADER_SHOW: {
      return {
        loading: true
      }
    }
    case Type.LOADER_HIDE: {
      return {
        loading: false
      }
    }
    default:
      return state;
  }
}

export const getLoading = (state) => state.rootState.loader.loading;
