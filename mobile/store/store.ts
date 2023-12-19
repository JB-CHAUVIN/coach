import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import agendaReducer from "./slices/agendaSlice";
import queryReducer from "./slices/querySlices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reactotron from "../config/reactotron";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    agenda: agendaReducer,
    query: queryReducer,
  },
  // @ts-ignore
  enhancers: () => [reactotron.createEnhancer()],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
