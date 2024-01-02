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
import Animated from "react-native-reanimated";
import { useAgendaHeaderAnimated } from "./AgendaHeader.animated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addictionTranslate } from "../../../../../constants/_features/addictions/addictions";
import { QUERY_IDS } from "../../../../../hooks/useQuery";
import { useAppSelector } from "../../../../../store/store";
import { sum } from "lodash";

const AgendaHeader: React.FC<AgendaHeaderProps> = (p) => {
  const {} = p || {};

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

  const {
    openAnalysis,
    handleToggle,
    container,
    buttonOpen,
    handleToggleStats,
    openStats,
  } = useAgendaHeaderAnimated();

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
    <Animated.View style={[s.container, container]}>
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

        {renderDetox()}
      </View>

      <Animated.View style={[s.containerSeeBallance, buttonOpen]}>
        <Pressable style={s.buttonSeeBallance} onPress={() => handleToggle()}>
          <Text style={s.textBallance}>{PHRASES.FR.SEE_BALANCE}</Text>
          <MaterialCommunityIcons
            name={openAnalysis ? "chevron-down" : "chevron-up"}
            style={s.iconBallance}
          />
        </Pressable>

        <Pressable
          style={s.buttonSeeBallance}
          onPress={() => handleToggleStats()}
        >
          <Text style={s.textBallance}>{PHRASES.FR.ANNUAL_STATS}</Text>
          <MaterialCommunityIcons
            name={openStats ? "chevron-down" : "chevron-up"}
            style={s.iconBallance}
          />
        </Pressable>
      </Animated.View>

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
                console.log(key, value);
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
    </Animated.View>
  );
};

export { AgendaHeader };
