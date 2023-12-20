import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    item: {
      id: null,
    },
    token: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.item = action?.payload;
    },
    setToken: (state, action) => {
      state.token = action?.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
