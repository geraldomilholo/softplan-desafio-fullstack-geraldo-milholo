import * as Type from './actionsTypes';

const showLoader = () => ({ type: Type.LOADER_SHOW });

const hideLoader = () => ({ type: Type.LOADER_HIDE });

export {
  showLoader, 
  hideLoader
}