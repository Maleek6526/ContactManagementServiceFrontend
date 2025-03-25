import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Ensure the path is correct

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
