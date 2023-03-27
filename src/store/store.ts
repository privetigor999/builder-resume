import { combineReducers, configureStore } from "@reduxjs/toolkit";
import resumeTabReducer from "./resumeTab/resumeTabReducer";
import userReducer from "./userSlice/userReducer";

const rootReducer = combineReducers({
  resumeTab: resumeTabReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
