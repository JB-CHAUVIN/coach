import React from "react";
import { TouchableOpacity, View } from "react-native";
import { s } from "./AgendaDay.styles";
import { AgendaDayProps } from "./AgendaDay.props";
import moment from "moment";
import { stringUcFirst } from "../../../../../utils/string";
import { Text } from "../../../../atoms/Text";
import { AgendaDayItem } from "./AgendaDayItem";
import { AgendaDayAddiction } from "./AgendaDayAddiction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SCREENS,
  useAppNavigation,
} from "../../../../../hooks/useAppNavigation";
import {find} from "lodash";
import {TYPE_EVENTS} from "../../../../../../types/Events";

const AgendaDayNonMemo: React.FC<AgendaDayProps> = (p) => {
  const { item } = p || {};

  const date = moment(item?.[0].date);
  const Time = ["matin", "midi", "apres-midi", "soir"];
  const timeOrder = Object.values(Time);
  const sortedItems = item.sort(
    (a, b) => timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time),
  );
  const navigation = useAppNavigation();

  const onPress = () => {
    navigation.navigate(SCREENS.MODAL.agendaAdd, {
      date,
    });
  };

  return (
    <TouchableOpacity onPress={onPress} style={s.container}>
      <View style={s.containerDate}>
        <Text style={s.textDate}>
          <Text style={[s.textDate, s.textDayName]}>
            {date ? stringUcFirst(date.format("dddd")) : null}
          </Text>
          <Text style={s.textDate}>
            {date ? stringUcFirst(date.format(" DD ")) : null}
          </Text>
          <Text style={s.textDate}>
            {date ? stringUcFirst(date.format("MMM")) : null}
          </Text>
        </Text>

        <AgendaDayAddiction date={date} />
      </View>

      {sortedItems.map((i) => {
        return <AgendaDayItem i={i} key={"agenda-day-item" + i.id} />;
      })}
    </TouchableOpacity>
  );
};

const AgendaDay = React.memo(AgendaDayNonMemo, (prevProps, nextProps) => {
  if (JSON.stringify(prevProps) !== JSON.stringify(nextProps)) {
    return false;
  }

  return true;
});

export { AgendaDay };
