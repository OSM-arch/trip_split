import {configureStore} from "@reduxjs/toolkit";
import userSlice from "@/store/features/userSlice.js";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"]
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);