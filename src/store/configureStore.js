import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

export default function configureStore() {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()]
  const composedEnhancers = compose(...enhancers)
  const store = createStore(rootReducer, composedEnhancers)
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => store.replaceReducer(rootReducer))
  }
  return store
}
