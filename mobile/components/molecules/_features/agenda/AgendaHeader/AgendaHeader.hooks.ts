import { useMemo } from "react";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { getEventByType } from "../Agenda/Agenda.utils";
import { meanBy } from "lodash";
import { useAppSelector } from "../../../../../store/store";
import { QUERY_IDS } from "../../../../../hooks/useQuery";

export const useAgendaHeaderInfos = () => {
  // @ts-ignore
  const events = useAppSelector((s) => s?.query?.[QUERY_IDS.HOME_ITEMS]);

  const infos = useMemo(() => {
    const total = events?.length || 0;
    const done =
      events?.filter(
        (e: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => e?.attributes?.done,
      )?.length || 0;

    let volumeTheorical = 0;
    let volumeDone = 0;

    let ratingsDone = [];
    let ratingsTheorical = [];
    for (let i in events) {
      const event = events[i];
      const { distance = 0, seance: seanceName } = event?.attributes || {};

      const seance = getEventByType(seanceName);
      const { ratings: rating } = seance || {}; // TODO : fetch ratings variations too!

      if (event?.attributes?.done) {
        ratingsDone.push(rating);
        ratingsTheorical.push(rating);
        volumeDone += distance || 0;
        volumeTheorical += distance || 0;
      } else {
        ratingsTheorical.push(rating);
        volumeTheorical += distance || 0;
      }
    }

    return {
      total: Math.round(total),
      done: Math.round(done),
      volumeDone: Math.round(volumeDone),
      volumeTheorical: Math.round(volumeTheorical),
      ratingsDone: {
        force: (meanBy(ratingsDone, "force") || 0) / 10,
        puissance: (meanBy(ratingsDone, "puissance") || 0) / 10,
        technique: (meanBy(ratingsDone, "technique") || 0) / 10,
        endurance: (meanBy(ratingsDone, "endurance") || 0) / 10,
        resistance: (meanBy(ratingsDone, "resistance") || 0) / 10,
      },
      ratingsTheorical: {
        force: (meanBy(ratingsTheorical, "force") || 0) / 10,
        puissance: (meanBy(ratingsTheorical, "puissance") || 0) / 10,
        technique: (meanBy(ratingsTheorical, "technique") || 0) / 10,
        endurance: (meanBy(ratingsTheorical, "endurance") || 0) / 10,
        resistance: (meanBy(ratingsTheorical, "resistance") || 0) / 10,
      },
    };
  }, [JSON.stringify(events)]);

  return {
    infos,
  };
};
