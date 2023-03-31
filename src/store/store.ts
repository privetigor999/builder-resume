import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice/tabSlice";
import userReducer from "./userSlice/userReducer";
import resumeDataReducer from "./resumeData/resumeReducer";
import feedBackReducer from "./feedbackSlice/feedBackReducer";

const rootReducer = combineReducers({
  resumeTab: tabSlice,
  user: userReducer,
  resumeData: resumeDataReducer,
  feedBack: feedBackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
