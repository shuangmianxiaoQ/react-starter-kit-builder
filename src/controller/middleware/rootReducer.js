import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from '../../modules/reducers';
import history from '../history';

// root redux reducer
const makeRooReducer = asyncReducers => {
  return combineReducers({
    ...asyncReducers,
    app,
    router: connectRouter(history)
  });
};

export const injectReudcer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducer, key)) return;
  store.asyncReducer[key] = reducer;

  store.replaceReducer(makeRooReducer(store.asyncReducer));
};

export default makeRooReducer;
