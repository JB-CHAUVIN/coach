import { RootState } from "../store";

export const SELECTOR_CLUBS_QUERY = (s: RootState) => s?.["query"]?.["CLUB"];
