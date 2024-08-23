import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  filters: {},
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setData, setFilters } = tableSlice.actions;
export default tableSlice.reducer;
