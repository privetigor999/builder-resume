import { combineReducers, configureStore } from "@reduxjs/toolkit";
import resumeTabReducer from "./resumeTab/resumeTabReducer";

const rootReducer = combineReducers({
  resumeTab: resumeTabReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
