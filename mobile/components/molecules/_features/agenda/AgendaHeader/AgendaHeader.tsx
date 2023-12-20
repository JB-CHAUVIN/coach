import React from "react";
import { View } from "react-native";
import { s } from "./AgendaHeader.styles";
import { AgendaHeaderProps } from "./AgendaHeader.props";
import { Text } from "../../../../atoms/Text";
import { PHRASES } from "../../../../../constants/phrases";
import RadarChart from "../../../../atoms/Charts/RadarChart";
import { SCREEN_WIDTH, SIZES } from "../../../../../constants/sizes";
import { useAgendaHeaderInfos } from "./AgendaHeader.hooks";
import { COLORS } from "../../../../../constants/colors";

const AgendaHeader: React.FC<AgendaHeaderProps> = (p) => {
  const {} = p || {};

  const { infos } = useAgendaHeaderInfos();

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
        PHRASES.FR.AGENDA_HEADER_TOTAL_DISTANCE,
        infos.volumeDone.toString() +
          " / " +
          infos.volumeTheorical.toString() +
          " km",
      )}

      {renderInfo(
        PHRASES.FR.AGENDA_HEADER_TOTAL,
        infos.done.toString() +
          " / " +
          infos.total.toString(),
      )}

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
    </View>
  );
};

export { AgendaHeader };
