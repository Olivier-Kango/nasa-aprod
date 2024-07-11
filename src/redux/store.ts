import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import throttle from 'lodash.throttle';

import { saveState, loadState } from '../local_storage/local_storage';
import apodReducer from './reducer/apodReducer';

// Define the root reducer with combineReducers
const rootReducer = combineReducers({
  apods: apodReducer,
});

// Configure the Redux store with the rootReducer, middleware, and preloaded state
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
  preloadedState: loadState(),
});

// Subscribe to the store and save the state to local storage with throttle
store.subscribe(
  throttle(() => {
    saveState({
      apods: store.getState().apods,
    });
  }, 1000),
);

// Export store and types for the root state and dispatch
export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
