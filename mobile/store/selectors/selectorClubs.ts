import { RootState } from "../store";

export const SELECTOR_CLUBS_QUERY = (s: RootState) => s?.["query"]?.["CLUB"];

// @ts-ignore
export const SELECTOR_CLUBS_GOALS_QUERY = (s: RootState) => s?.["query"]?.["CLUB"]?.["attributes"]?.["goals"]?.["data"];
