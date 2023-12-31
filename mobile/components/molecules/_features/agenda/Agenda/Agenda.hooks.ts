/* @ts-ignore */
import {
  API_ENDPOINTS,
  QUERY_IDS,
  useQuery,
} from "../../../../../hooks/useQuery";
import { useEffect, useMemo } from "react";
import { getEventByType } from "./Agenda.utils";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import moment from "moment";
import { TYPE_USER } from "../../../../../../types/User";
import { setUser } from "../../../../../store/slices/userSlice";
import { startOfWeek } from "@internationalized/date";
import { useUser } from "../../../../../hooks/useUser";
import {useGetClubInfos} from "../../coach/Coach.hooks";

export const useAgendaEvents = () => {
  const currentDate = useAppSelector((s) => s?.agenda?.currentDate);
  const dispatch = useAppDispatch();

  const { user } = useUser();

  const startOfWeek = moment(currentDate).startOf("isoWeek");
  const endOfWeek = moment(currentDate).endOf("isoWeek");

  const filterQueryDate =
    "&filters[date][$gte]=" +
    startOfWeek.format("YYYY-MM-DD") +
    "&filters[date][$lt]=" +
    endOfWeek.format("YYYY-MM-DD");
  
  // load one week of events
  const { isLoading, data, handleQuery } = useQuery(
    API_ENDPOINTS.EVENT_GET + filterQueryDate,
    {
      id: QUERY_IDS.HOME_ITEMS,
    },
  );

  // load one week of addictions
  const { handleQuery: handleQueryAddictions, isLoading: isLoadingAddictions } =
    useQuery(API_ENDPOINTS.DETOX_GET + filterQueryDate, {
      id: QUERY_IDS.DETOX_ITEMS,
    });

  // stats
  const { handleQuery: handleQueryStats, isLoading: isLoadingStats } = useQuery(
    API_ENDPOINTS.STATS_GET,
    {
      id: QUERY_IDS.STATS,
    },
  );

  // re-fetch user
  const { handleQuery: handleQueryUser, isLoading: isLoadingUser } = useQuery(
    API_ENDPOINTS.USER_ME,
  );

  // club
  useGetClubInfos();

  useEffect(() => {
    console.log("[INFO] Loading week", { currentDate, startOfWeek, endOfWeek });
    handleQuery("GET");
    handleQueryAddictions("GET");
    handleQueryStats("GET");
    handleQueryUser("GET", {
      onSuccess: (data: TYPE_USER) => {
        dispatch(setUser(data));
      },
    });

  }, [startOfWeek.toString(), user?.item?.id]);

  const events = useMemo(() => {
    let res = {};
    let dots = {};

    // @ts-ignore
    for (let i in data) {
      const { attributes, id } = data?.[i];
      if (attributes) {
        const { date } = attributes;
        // @ts-ignore
        if (!res[date]) {
          // @ts-ignore
          res[date] = [];
        }
        // @ts-ignore
        if (!dots[date]) {
          // @ts-ignore
          dots[date] = {
            dots: [],
          };
        }

        // @ts-ignore
        const event = getEventByType(attributes.seance);

        // @ts-ignore
        res[date].push({
          // @ts-ignore
          ...attributes,
          id,
          date,
        });

        // dot
        // @ts-ignore
        dots[date].dots.push({ key: attributes.seance, color: event?.color });
      }
    }
    return {
      events: res,
      dots,
    };
  }, [JSON.stringify(data)]);

  return {
    isLoading:
      isLoading && isLoadingAddictions && isLoadingStats && isLoadingUser,
    events,
    currentDate,
    user,
  };
};
