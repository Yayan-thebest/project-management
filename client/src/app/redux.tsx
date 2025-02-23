import React from "react";
import { useRef } from "react";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, Storage, WebStorage } from 'redux-persist';
import { api } from "@/state/api";
import globalReducer from "@/state";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { PersistGate } from "redux-persist/integration/react";

/* REDUX PERSISTENCE */
const createNoopStorage = (): Storage => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem( value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage: WebStorage | Storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Define root reducer first
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

// Define RootState type based on rootReducer
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

// Explicitly type the persisted reducer
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
  return store;
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  const persistor = useRef(persistStore(storeRef.current)).current;

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
