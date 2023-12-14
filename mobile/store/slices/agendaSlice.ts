import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const agendaSlice = createSlice({
  name: "counter",
  initialState: {
    currentDate: moment(),
  },
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export const { setCurrentDate } = agendaSlice.actions;

export default agendaSlice.reducer;

