import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
    key: 'root',
    storage,
}

const reducer = persistCombineReducers(config, reducers)

export function configureStore() {
    let store = createStore(reducer, applyMiddleware(logger))
    let persistor = persistStore(store)

    return { persistor, store }
}