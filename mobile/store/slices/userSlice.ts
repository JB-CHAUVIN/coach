import { createSlice } from "@reduxjs/toolkit";
import { TYPE_USER } from "../../../types/User";

const initialState: {
  item?: TYPE_USER;
  jwt: string;
  hasValidClub?: boolean;
  isCoach?: boolean;
} = {
  jwt: "",
  isCoach: false,
  hasValidClub: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.item = {
        ...state.item,
        ...action?.payload,
      };

      state.hasValidClub = !!(
        state.item?.role2 === "coach" && state.item?.club
      );
      state.isCoach = state.item?.role2 === "coach";
    },
    cleanUser: (state) => {
      state.item = undefined;
      state.jwt = "";
      state.hasValidClub = false;
      state.isCoach = false;
    },
    setToken: (state, action) => {
      state.jwt = action?.payload;
    },
  },
});

export const { setUser, setToken, cleanUser } = userSlice.actions;

export default userSlice.reducer;
