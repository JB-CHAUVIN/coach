/* @ts-ignore */
import { API_ENDPOINTS, useQuery } from "../../../../../hooks/useQuery";
import { useEffect, useMemo } from "react";
import { getEventByType } from "./Agenda.utils";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import {orderBy, sortBy} from "lodash";

export const useAgendaEvents = () => {
  const { isLoading, data, handleQuery } = useQuery(API_ENDPOINTS.EVENT);

  useEffect(() => {
    handleQuery("GET");
  }, []);

  const events = useMemo(() => {
    let res = {};
    let dots = {};

    // @ts-ignore
    for (let i in data) {
      const { attributes } = data?.[i];
      if (attributes) {
        const { date } = attributes;
        if (!res[date]) {
          // @ts-ignore
          res[date] = [];
        }
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
          date,
        });

        // dot
        // @ts-ignore
        dots[date].dots.push({key: attributes.seance, color: event?.color});
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
  };
};
