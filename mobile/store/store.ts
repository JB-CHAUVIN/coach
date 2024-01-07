import {combineReducers, configureStore} from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import agendaReducer from "./slices/agendaSlice";
import queryReducer from "./slices/querySlices";
import userReducer from "./slices/userSlice";
import settingsReducer from "./slices/settingsSlice";
import {persistReducer, persistStore} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reactotron from "../config/reactotron";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "counter", "settings"],
  blacklist: ["query"],
};

const reducer = {
  counter: counterReducer,
  agenda: agendaReducer,
  query: queryReducer,
  user: userReducer,
  settings: settingsReducer,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducer));

const store = configureStore({
  reducer: persistedReducer,
  // @ts-ignore
  middleware: () => [],
  // @ts-ignore
  enhancers: () => [reactotron.createEnhancer()],
});

export const persistor = persistStore(store)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
