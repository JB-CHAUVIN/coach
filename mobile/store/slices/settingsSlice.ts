import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    ignoredAddictions: [],
    goals: {}
  } as any,
  reducers: {
    setSetting: (state, action) => {
      // @ts-ignore
      state[action.payload.key] = action.payload.value;
    },
    setGoal: (state, action) => {
      state.goals[action.payload.key] = action.payload.value;
    }
  },
});

export const { setSetting, setGoal } = settingsSlice.actions;

export default settingsSlice.reducer;
