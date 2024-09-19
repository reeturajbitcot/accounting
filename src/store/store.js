import { configureStore } from "@reduxjs/toolkit";
import accountingReducer from "./slice/transactionSlice";

export default configureStore({
  reducer: {
    accounting: accountingReducer,
  },
});
