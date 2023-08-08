import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Features/Transaction/TransactionSlice"

export const store = configureStore({
    reducer: {
      transactions:transactionReducer
    },
});
