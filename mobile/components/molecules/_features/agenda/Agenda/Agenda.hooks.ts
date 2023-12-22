/* @ts-ignore */
import {
  API_ENDPOINTS,
  QUERY_IDS,
  useQuery,
} from "../../../../../hooks/useQuery";
import { useEffect, useMemo } from "react";
import { getEventByType } from "./Agenda.utils";
import { useAppSelector } from "../../../../../store/store";
import moment from "moment";

export const useAgendaEvents = () => {
  const currentDate = useAppSelector((s) => s?.agenda?.currentDate);

  const startOfWeek = moment(currentDate).startOf("isoWeek");
  const endOfWeek = moment(currentDate).endOf("isoWeek");

  // load one week
  const { isLoading, data, handleQuery } = useQuery(
    API_ENDPOINTS.EVENT_GET +
      "&filters[date][$gte]=" +
      startOfWeek.format("YYYY-MM-DD") +
      "&filters[date][$lt]=" +
      endOfWeek.add(2, 'day').format("YYYY-MM-DD"),
    {
      id: QUERY_IDS.HOME_ITEMS,
    },
  );

  useEffect(() => {
    console.log('[INFO] Loading week', { currentDate, startOfWeek, endOfWeek });
    handleQuery("GET");
  }, [startOfWeek.toString()]);

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
    isLoading,
    events,
    currentDate,
  };
};
