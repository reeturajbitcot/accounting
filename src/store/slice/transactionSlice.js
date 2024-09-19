import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creditList: [],
  debitList: [],
};

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
  },
});

export const { addTransaction } = accountingSlicer.actions;
export default accountingSlicer.reducer;
