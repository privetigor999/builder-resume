import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice/tabSlice";
import userReducer from "./userSlice/userReducer";
import resumeDataReducer from "./resumeData/resumeReducer";

const rootReducer = combineReducers({
  resumeTab: tabSlice,
  user: userReducer,
  resumeData: resumeDataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
