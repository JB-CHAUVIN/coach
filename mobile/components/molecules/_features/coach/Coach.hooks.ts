import { useEffect } from "react";
import { useUser } from "../../../../hooks/useUser";
import { useClub } from "../../../../hooks/useClub";

export const useGetClubInfos = () => {
  const { user } = useUser();
  const { clubId, handleQuery, isLoading } = useClub();

  useEffect(() => {
    if (user?.isCoach && user?.hasValidClub || user?.item?.club?.id && user?.item?.pendingJoinClub === false) {
      handleQuery("GET");
    }
  }, [user, clubId]);

  return {
    isLoading,
  };
};
