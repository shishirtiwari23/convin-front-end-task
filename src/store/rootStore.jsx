import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rootStore = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
  },
});

export default rootStore;
