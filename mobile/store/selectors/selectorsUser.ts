import { RootState } from "../store";

export const SELECTOR_USER_IS_PENDING_CLUB = (s: RootState) =>
  s?.user?.item?.pendingJoinClub;

export const SELECTOR_USER_CLUB = (s: RootState) =>
  s?.user?.item?.club;
