import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "../reducers";

const persistConfig = { key: "root", blacklist: [], storage };
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
//@ts-ignore
const persistor = persistStore(store);
export { store, persistor };
