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

const AgendaHeader: React.FC<AgendaHeaderProps> = (p) => {
  const {} = p || {};

  const { infos } = useAgendaHeaderInfos();

  const { open, handleToggle, container, buttonOpen } =
    useAgendaHeaderAnimated();

  const renderInfo = (key: string, value: string) => {
    return (
      <View style={s.containerInfo}>
        <Text style={s.text}>{key}</Text>
        <Text style={[s.text, s.textValue]}>{value}</Text>
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

      <Pressable onPress={() => handleToggle()}>
        <Animated.View style={[s.buttonSeeBallance, buttonOpen]}>
          <Text style={s.textBallance}>{PHRASES.FR.SEE_BALANCE}</Text>
          <MaterialCommunityIcons
            name={open ? "chevron-down" : "chevron-up"}
            style={s.iconBallance}
          />
        </Animated.View>
      </Pressable>

      {infos &&
      infos?.ratingsTheorical &&
      infos?.ratingsTheorical?.endurance ? (
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
    </Animated.View>
  );
};

export { AgendaHeader };
