import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransaction } from "./TransactionApi"

const initialState = {
      isLoading: false,
      isError: false,
      error: '',
      transactions: [],
      editing:{}
}

export const fetchTransaction = createAsyncThunk("transaction/fetchTransaction", async () => {
      const response = await getTransaction()
      return response
})
export const createTransaction = createAsyncThunk("transaction/createTransaction", async ( data ) => {
      const response = await addTransaction(data)
      return response
})
export const updateTransaction = createAsyncThunk("transaction/updateTransaction", async ({ id, data }) => {
      const response = await editTransaction(id, data)
      return response
})
export const removeTransaction = createAsyncThunk("transaction/removeTransaction", async ( id ) => {
      const response = await deleteTransaction(id)
      return response
})

const transactionSlice = createSlice({
      name: "transactions",
      initialState,
      reducers:{
         editActive:(state,action)=>
         {
            state.editing=action.payload
         },
         editInActive:(state)=>{
            state.editing={}
         }
      },
      extraReducers: (builder) => {
            builder.addCase(fetchTransaction.pending, (state) => {
                  state.isLoading = true
                  state.isError = false
            }).addCase(fetchTransaction.fulfilled, (state, action) => {
                  state.isLoading = false
                  state.transactions = action.payload
            }).addCase(fetchTransaction.rejected, (state, action) => {
                  state.isLoading = false
                  state.transactions = []
                  state.isError = true
                  state.error = action.error.message
            }).addCase(createTransaction.pending, (state) => {
                  state.isLoading = true
                  state.isError = false
            }).addCase(createTransaction.fulfilled, (state, action) => {
                  state.isLoading = false
                  state.transactions.push(action.payload)
            }).addCase(createTransaction.rejected, (state, action) => {
                  state.isLoading = false
                  state.isError = true
                  state.error = action.error.message
            }).addCase(updateTransaction.pending, (state) => {
                  state.isLoading = true
                  state.isError = false
            }).addCase(updateTransaction.fulfilled, (state, action) => {
                  state.isLoading = false
                  const indexToFind=state.transactions.findIndex(transaction => transaction.id === action.payload.id)
                  state.transactions[indexToFind]=action.payload
            }).addCase(updateTransaction.rejected, (state, action) => {
                  state.isLoading = false
                  state.isError = true
                  state.error = action.error.message
            }).addCase(removeTransaction.pending, (state) => {
                  state.isLoading = true
                  state.isError = false
            }).addCase(removeTransaction.fulfilled, (state, action) => {
                  state.isLoading = false
                  state.transactions=state.transactions.filter(transaction=> transaction.id!==action.meta.arg)
            }).addCase(removeTransaction.rejected, (state, action) => {
                  state.isLoading = false
                  state.isError = true
                  state.error = action.error.message
            })
      }
})

export default transactionSlice.reducer
export const {editActive,editInActive}=transactionSlice.actions