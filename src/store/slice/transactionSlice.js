import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creditList: [],
  debitList: [],
};

console.log(initialState.creditList);

export const accountingSlicer = createSlice({
  name: "accounting",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      if (action.payload.type === "credit") {
        state.creditList.push(action.payload);
      } else {
        state.debitList.push(action.payload);
      }
    },

    updateTransaction: (state, action) => {
      const { id, type, value, description } = action.payload;

      if (type === "credit") {
        const index = state.creditList.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.creditList[index].value = value;
          state.creditList[index].description = description;
        }
      } else {
        const index = state.debitList.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.debitList[index].value = value;
          state.debitList[index].description = description;
        }
      }
    },

    deleteTransaction: (state, action) => {
      const { id, type } = action.payload;
      if (type === "credit") {
        state.creditList = state.creditList.filter((item) => item.id !== id);
      } else {
        state.debitList = state.debitList.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  accountingSlicer.actions;
export default accountingSlicer.reducer;
