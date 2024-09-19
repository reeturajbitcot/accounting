import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  debit: 0,
  credit: 0,
};

export const accountingSlicer = createSlice({
  name: "accounting",
  initialState,
  reducers: {
    addTotal: (state, action) => {
      state.total += action.payload;
    },
    subtractTotal: (state, action) => {
      state.total -= action.payload;
    },
    addDebit: (state, action) => {
      state.debit += action.payload;
    },
    subtractDebit: (state, action) => {
      state.debit -= action.payload;
    },
    addCredit: (state, action) => {
      state.credit += action.payload;
    },
    subtractCredit: (state, action) => {
      state.credit -= action.payload;
    },
  },
});

export const {
  addTotal,
  subtractTotal,
  addDebit,
  subtractDebit,
  addCredit,
  subtractCredit,
} = accountingSlicer.actions;
export default accountingSlicer.reducer;
