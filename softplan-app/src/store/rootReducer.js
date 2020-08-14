import { combineReducers } from 'redux';
import auth from './auth/reducer';
import toast from './toast/reducer';
import loader from './loader/reducer';
import process from './process/reducer';
import user from './user/reducer';

export default combineReducers({
  auth,
  toast,
  loader,
  process,
  user
});
