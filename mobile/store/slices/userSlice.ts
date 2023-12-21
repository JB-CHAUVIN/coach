import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    item: {
      id: null,
      stravaToken: null,
    },
    jwt: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.item = {
        ...state.item,
        ...action?.payload,
      };
    },
    cleanUser: (state) => {
      state.item = {
        id: null,
        stravaToken: null,
      };
      state.jwt = "";
    },
    setToken: (state, action) => {
      state.jwt = action?.payload;
    },
  },
});

export const { setUser, setToken, cleanUser } = userSlice.actions;

export default userSlice.reducer;
