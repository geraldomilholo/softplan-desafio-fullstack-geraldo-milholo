import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';

import DEV_TOOLS from '../config/devTools';
import rootSaga from '../sagas/rootSaga';
import rootReducer from './rootReducer';

const encryptor = createEncryptor({
  secretKey: 'b76eebb16ebf6fdc69d55988b5560050',
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = DEV_TOOLS || compose;

const persistRootConfig = {
  key: 'rootState',
  storage,
  transforms: [encryptor]
};

const persistedRoot = persistReducer(persistRootConfig, rootReducer);

const reducers = combineReducers({
  rootState: persistedRoot,
});


const state = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(state);
sagaMiddleware.run(rootSaga);

function stateRoot() {
  return state.getState().rootState
}

export {
  state,
  persistor,
  stateRoot
};