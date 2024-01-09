import { createSlice } from "@reduxjs/toolkit";
import { QUERY_IDS } from "../../hooks/useQuery";

export const querySlice = createSlice({
  name: "queries",
  initialState: {
    [QUERY_IDS.HOME_ITEMS]: [],
    [QUERY_IDS.DETOX_ITEMS]: [],
    [QUERY_IDS.STATS]: {
      distanceDone: 0,
      eventsDone: 0,
      detoxDone: {
        alcohol: 0,
        tobacco: 0,
        drugs: 0,
      },
      footingDone: 0,
      renfoDone: 0,
      qualityDone: 0,
      slDone: 0,
    },
  },
  reducers: {
    setQueryStore: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key] = action.payload?.value;
    },
    updateStoreItem: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key] = state[action?.payload?.key].map((i) => {
        if (i.id === action.payload.value.id) {
          return {
            ...i,
            ...action.payload.value,
            attributes: {
              ...i.attributes,
              ...action?.payload?.value?.attributes,
            }
          };
        }
        return i;
      });
    },
    addStoreItem: (state, action) => {
      const { key, value } = action?.payload || {};

      // @ts-ignore
      if (typeof state[key] === "undefined") {
        // @ts-ignore
        state[key] = [];
      }

      // @ts-ignore
      state[key].push(value);
    },
    removeStoreItem: (state, action) => {
      // @ts-ignore
      state[action?.payload?.key] = state[action?.payload?.key].filter(
        (i: any) => i.id !== action.payload.value,
      );
    },
  },
});

export const { setQueryStore, removeStoreItem, updateStoreItem, addStoreItem } =
  querySlice.actions;

export default querySlice.reducer;
