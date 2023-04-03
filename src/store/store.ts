import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice/tabSlice";
import userReducer from "./userSlice/userReducer";
import resumeDataReducer from "./resumeData/resumeReducer";
import feedBackReducer from "./feedbackSlice/feedBackReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "resumeData"],
};

const rootReducer = combineReducers({
  resumeTab: tabSlice,
  user: userReducer,
  resumeData: resumeDataReducer,
  feedBack: feedBackReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
