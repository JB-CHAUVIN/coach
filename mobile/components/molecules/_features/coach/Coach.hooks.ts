import { API_ENDPOINTS, QUERY_IDS, useQuery } from "../../../../hooks/useQuery";
import { useAppSelector } from "../../../../store/store";
import { SELECTOR_USER_CLUB } from "../../../../store/selectors/selectorsUser";
import { useEffect } from "react";
import { useUser } from "../../../../hooks/useUser";

export const useGetClubInfos = () => {
  const clubId = useAppSelector(SELECTOR_USER_CLUB)?.id;

  const { user } = useUser();
  const { handleQuery } = useQuery(API_ENDPOINTS.CLUB_CRUD + "/" + clubId + "?populate=users", {
    id: QUERY_IDS.CLUB,
  });

  useEffect(() => {
    if (user?.isCoach && user?.hasValidClub) {
      handleQuery("GET");
    }
  }, [user, clubId]);
};
