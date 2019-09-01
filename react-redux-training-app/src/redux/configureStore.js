import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootSaga from "./sagas/index";

export default function configureStore(initialState) {

  // const monitor = createSagaMonitor(window["__SAGA_MONITOR_EXTENSION__"])
  // const monitor = window["__SAGA_MONITOR_EXTENSION__"];
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancer =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

  // const composeEnhancers =
  //     compose(
  //         applyMiddleware(thunk,sagaMiddleware, reduxImmutableStateInvariant()),
  //         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
  //     );

  let store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk, sagaMiddleware, reduxImmutableStateInvariant())) //thunk is passed here to support async calls in middleware (it will inject dispatch in action generators methods)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
