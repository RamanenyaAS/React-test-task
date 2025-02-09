import { configureStore } from "@reduxjs/toolkit";
import seminarsReducer from "../slice/slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: seminarsReducer
})

// Для типизации dispatch создал кастомный хук, но почему то не работает :(
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;