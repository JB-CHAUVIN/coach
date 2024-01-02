import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    ignoredAddictions: [],
  },
  reducers: {
    setSetting: (state, action) => {
      // @ts-ignore
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
