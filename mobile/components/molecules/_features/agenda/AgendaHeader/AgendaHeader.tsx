import React, { useMemo } from "react";
import { View } from "react-native";
import { s } from "./AgendaHeader.styles";
import { AgendaHeaderProps } from "./AgendaHeader.props";
import { Text } from "../../../../atoms/Text";
import { PHRASES } from "../../../../../constants/phrases";
import { QUERY_IDS } from "../../../../../hooks/useQuery";
import { useAppSelector } from "../../../../../store/store";
import { TYPE_STRAPI_RESULT } from "../../../../../../types/_Strapi";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import RadarChart from "../../../../atoms/Charts/RadarChart";
import { getEventByType } from "../Agenda/Agenda.utils";
import { SCREEN_WIDTH, SIZES } from "../../../../../constants/sizes";

const AgendaHeader: React.FC<AgendaHeaderProps> = (p) => {
  const {} = p || {};

  // @ts-ignore
  const events = useAppSelector((s) => s?.query?.[QUERY_IDS.HOME_ITEMS]);

  const infos = useMemo(() => {
    const total = events?.length || 0;
    const done =
      events?.filter(
        (e: TYPE_STRAPI_RESULT<TYPE_EVENTS>) => e?.attributes?.done,
      )?.length || 0;

    let ratings = [];
    for (let i in events) {
      const event = events[i];
      const seance = getEventByType(event.attributes.seance);
      const { ratings: rating } = seance || {}; // TODO : fetch ratings variations too!
      ratings.push(rating);
    }

    return {
      total,
      done,
      percent: Math.round((done / total) * 100),
      ratings,
    };
  }, [JSON.stringify(events)]);

  const renderInfo = (key: string, value: string) => {
    return (
      <View style={s.containerInfo}>
        <Text style={s.text}>{key}</Text>
        <Text style={[s.text, s.textValue]}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={s.container}>
      <Text style={s.textTitle}>{PHRASES.FR.AGENDA_HEADER_TITLE}</Text>
      {renderInfo(
        PHRASES.FR.AGENDA_HEADER_TOTAL,
        infos.done.toString() +
          " / " +
          infos.total.toString() +
          " (" +
          infos.percent +
          "%)",
      )}

      {infos?.ratings && infos?.ratings?.length > 0 ? (
        <RadarChart
          graphSize={SCREEN_WIDTH - SIZES.PADDING_PAGE * 4}
          scaleCount={10}
          numberInterval={2}
          data={[{
              force: 10/10,
              endurance: 10/10,
              v: 2/10,
              t: 3/10,
              r:5/10
          }]}
          options={{
            graphShape: 1,
            showAxis: true,
            showIndicator: true,
            colorList: ["blue", "red"],
            dotList: [false, true],
          }}
        />
      ) : null}
    </View>
  );
};

export { AgendaHeader };
