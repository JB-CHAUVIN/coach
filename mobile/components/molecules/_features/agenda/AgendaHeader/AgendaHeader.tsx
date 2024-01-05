import React from "react";
import { Pressable, View } from "react-native";
import { s } from "./AgendaHeader.styles";
import { AgendaHeaderProps } from "./AgendaHeader.props";
import { Text } from "../../../../atoms/Text";
import { phraseParse, PHRASES } from "../../../../../constants/phrases";
import RadarChart from "../../../../atoms/Charts/RadarChart";
import { SCREEN_WIDTH, SIZES } from "../../../../../constants/sizes";
import { useAgendaHeaderInfos } from "./AgendaHeader.hooks";
import { COLORS } from "../../../../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addictionTranslate } from "../../../../../constants/_features/addictions/addictions";
import { QUERY_IDS } from "../../../../../hooks/useQuery";
import { useAppSelector } from "../../../../../store/store";
import { getEventByType } from "../Agenda/Agenda.utils";

const AgendaHeader: React.FC<AgendaHeaderProps> = (p) => {
  const {} = p || {};

  const [openAnalysis, setOpenAnalysis] = React.useState(false);
  const [openStats, setOpenStats] = React.useState(false);

  const { infos } = useAgendaHeaderInfos();
  const stats = useAppSelector((s) => s?.query?.[QUERY_IDS.STATS]);
  const {
    // @ts-ignore
    distanceDone = 0,
    // @ts-ignore
    eventsDone = 0,
    // @ts-ignore
    footingDone = 0,
    // @ts-ignore
    slDone = 0,
    // @ts-ignore
    renfoDone = 0,
    // @ts-ignore
    qualityDone = 0,
    // @ts-ignore,
    detoxDoneTotal = 0,
    // @ts-ignore,
    detoxDone = {},
  } = stats || {};

  let height = 0;
  if (infos?.goalsStats) {
    height += 50;
  }

  const renderInfo = (key: string, value: string) => {
    return (
      <View style={s.containerInfo}>
        <Text style={s.text}>{key}</Text>
        <Text style={[s.text, s.textValue]}>{value}</Text>
      </View>
    );
  };

  const renderSubInfo = (key: string, value: string) => {
    return (
      <View style={s.containerSubInfo}>
        <Text style={s.textSub}>{key}</Text>
        <Text style={[s.textSub, s.textValueSub]}>{value}</Text>
      </View>
    );
  };

  const renderDetox = () => {
    for (let i in infos?.detox) {
      const name = i;
      const number = infos?.detox[i]?.length || 0;
      const phrase = phraseParse(PHRASES.FR.ADDICTION_CONTROL_HEADER, {
        name: addictionTranslate(name).toLowerCase(),
      });
      return renderInfo(phrase, number.toString());
    }

    return null;
  };

  return (
    <View style={[s.container]}>
      <Text style={s.textTitle}>{PHRASES.FR.AGENDA_HEADER_TITLE}</Text>

      <View style={s.containerStats}>
        {renderInfo(
          PHRASES.FR.AGENDA_HEADER_TOTAL_DISTANCE,
          infos.volumeDone.toString() +
            " / " +
            infos.volumeTheorical.toString() +
            " km",
        )}

        {renderInfo(
          PHRASES.FR.AGENDA_HEADER_TOTAL,
          infos.done.toString() + " / " + infos.total.toString(),
        )}

        {infos?.goalsStats ? (
          <View style={s.containerSubInfoStats}>
            {Object.keys(infos?.goalsStats)?.map((i) => {
              const key = i;
              const value = infos?.goalsStats?.[i];
              const seance = getEventByType(key);
              return renderSubInfo(
                seance?.label,
                " " + value?.done + " / " + value?.total,
              );
            })}
          </View>
        ) : null}

        {renderDetox()}
      </View>

      <View style={[s.containerSeeBallance]}>
        <Pressable
          style={s.buttonSeeBallance}
          onPress={() => {
            setOpenAnalysis(!openAnalysis);
            if (openStats) {
              setOpenStats(false);
            }
          }}
        >
          <Text style={s.textBallance}>{PHRASES.FR.SEE_BALANCE}</Text>
          <MaterialCommunityIcons
            name={openAnalysis ? "chevron-down" : "chevron-up"}
            style={s.iconBallance}
          />
        </Pressable>

        <Pressable
          style={s.buttonSeeBallance}
          onPress={() => {
            setOpenStats(!openStats);
            if (openAnalysis) {
              setOpenAnalysis(false);
            }
          }}
        >
          <Text style={s.textBallance}>{PHRASES.FR.ANNUAL_STATS}</Text>
          <MaterialCommunityIcons
            name={openStats ? "chevron-down" : "chevron-up"}
            style={s.iconBallance}
          />
        </Pressable>
      </View>

      {infos &&
      infos?.ratingsTheorical &&
      infos?.ratingsTheorical?.endurance &&
      openAnalysis ? (
        <View style={s.containerCharts}>
          <RadarChart
            graphSize={SCREEN_WIDTH - SIZES.PADDING_PAGE * 2}
            scaleCount={10}
            numberInterval={2}
            data={[infos?.ratingsTheorical, infos?.ratingsDone]}
            options={{
              graphShape: 3,
              showAxis: false,
              showIndicator: false,
              colorList: [COLORS.secondary, COLORS.green],
              dotList: [true, false],
            }}
          />
        </View>
      ) : null}

      {openStats ? (
        <View style={s.containerStatsAnnual}>
          {renderInfo(PHRASES.FR.TOTAL_DISTANCE, distanceDone + " km")}

          <View style={s.containerGroupStats}>
            {renderInfo(PHRASES.FR.EVENTS_DONE, eventsDone + " km")}

            <View style={s.containerSubInfoStats}>
              {renderSubInfo(PHRASES.FR.FOOTING_DONE, footingDone)}
              {renderSubInfo(PHRASES.FR.QUALITY_DONE, qualityDone)}
              {renderSubInfo(PHRASES.FR.SL_DONE, slDone)}
              {renderSubInfo(PHRASES.FR.RENFO_DONE, renfoDone)}
            </View>
          </View>

          <View style={s.containerGroupStats}>
            {renderInfo(PHRASES.FR.JOURS_DETOX, detoxDoneTotal)}

            <View style={s.containerSubInfoStats}>
              {Object.keys(detoxDone).map((i) => {
                const key = i;
                const value = detoxDone[i];
                return renderSubInfo(
                  phraseParse(PHRASES.FR.ADDICTION_X, {
                    x: addictionTranslate(key),
                  }),
                  value,
                );
              })}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export { AgendaHeader };
