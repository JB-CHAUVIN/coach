import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "queries",
  initialState: {},
  reducers: {
    setQueryStore: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key] = action.payload?.value;
    },
    updateStoreItem: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key] = state[action?.payload?.key].map((i) => {
        if (i.id === action.payload.value.id) {
          return action.payload.value;
        }
        return i;
      });
    },
    addStoreItem: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key].push(action.payload.value);
    },
  },
});

export const { setQueryStore, updateStoreItem, addStoreItem } =
  querySlice.actions;

export default querySlice.reducer;
