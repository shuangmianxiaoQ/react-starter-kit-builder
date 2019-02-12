// `saga`入口
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import createSagaMiddlewareHelpers from 'redux-saga-watch-actions/lib/middleware';
import watchSagas from '../../modules/saga';

const sagaMiddleware = createSagaMiddleware();
const runSaga = saga => sagaMiddleware.run(saga);

const { injectSaga, cancelTask } = createSagaMiddlewareHelpers(sagaMiddleware);

export function* rootSaga() {
  yield all([watchSagas]);
}

export { cancelTask, injectSaga, runSaga };
export default sagaMiddleware;
