import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'

//middleware for persistent storage
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        "currentUser"
    ],
    blacklist: [

    ]
}

const persistentReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    persistentReducer,
    applyMiddleware(
        createLogger()
    )
)
let persistor = persistStore(store)
export default {
    store,
    persistor
}