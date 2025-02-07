import { configureStore } from "@reduxjs/toolkit";
import seminarsReducer from "../slice/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: seminarsReducer
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;