import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./commentsSlice";
import followReducer from "./followSlice";
import myAllTimeHitsReducer from "./MyAllTimeSlice";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    follow: followReducer,
    myAllTimeHitsList: myAllTimeHitsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
