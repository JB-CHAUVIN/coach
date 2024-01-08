import { useGetClubInfos } from "../../Coach.hooks";
import { useMemo } from "react";
import { groupBy } from "lodash";
import { TYPE_STRAPI_RESULT } from "../../../../../../../types/_Strapi";
import { TYPE_CLUB } from "../../../../../../../types/Club";
import { useAppSelector } from "../../../../../../store/store";
import { SELECTOR_CLUBS_QUERY } from "../../../../../../store/selectors/selectorClubs";
import { PHRASES } from "../../../../../../constants/phrases";

export const useClubUserManagement = () => {
  // @ts-ignore
  const clubDetailed: TYPE_STRAPI_RESULT<TYPE_CLUB> =
    useAppSelector(SELECTOR_CLUBS_QUERY);

  // club
  const { isLoading: isLoadingClub } = useGetClubInfos();

  const usersClubSectionList = useMemo(() => {
    const groups = groupBy(
      clubDetailed?.attributes?.users?.data,
      "attributes.role2",
    );
    let res = [];
    for (let i in groups) {
      const group = groups[i];
      res.push({
        // @ts-ignore
        title: PHRASES?.FR?.["LABEL_ROLE2_" + i] || i,
        data: group,
      });
    }

    return res;
  }, [clubDetailed?.attributes?.users?.data]);

  return {
    isLoadingClub,
    usersClubSectionList,
  };
};
