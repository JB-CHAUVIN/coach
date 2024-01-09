import { API_ENDPOINTS, QUERY_IDS, useQuery } from "./useQuery";
import { useAppSelector } from "../store/store";
import { SELECTOR_USER_CLUB } from "../store/selectors/selectorsUser";

export const useClub = () => {
  const clubId = useAppSelector(SELECTOR_USER_CLUB)?.id || 0;
  const { handleQuery, isLoading } = useQuery(
    API_ENDPOINTS.CLUB_CRUD_GET_ONE(clubId),
    {
      id: QUERY_IDS.CLUB,
    },
  );

  return {
    clubId,
    handleQuery,
    isLoading,
  };
};
