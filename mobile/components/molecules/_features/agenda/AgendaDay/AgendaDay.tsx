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
import { useNavigation } from "expo-router";

const AgendaDay: React.FC<AgendaDayProps> = (p) => {
  const { item } = p || {};

  const navigation = useNavigation();
  const date = moment(item?.[0].date);
  const Time = ["matin", "midi", "apres-midi", "soir"];
  const timeOrder = Object.values(Time);
  const sortedItems = item.sort(
    (a, b) => timeOrder.indexOf(a.time) - timeOrder.indexOf(b.time),
  );

  return (
    <View style={s.container}>
      <View style={s.containerDate}>
        <Text style={s.textDate}>
          <Text style={[s.textDate, s.textDayName]}>
            {stringUcFirst(date.format("dddd"))}
          </Text>
          <Text style={s.textDate}>{stringUcFirst(date.format(" DD "))}</Text>
          <Text style={s.textDate}>{stringUcFirst(date.format("MMM"))}</Text>
        </Text>

        <TouchableOpacity
          style={s.buttonAdd}
          onPress={() =>
            navigation.navigate("modal-agenda-add", {
              date,
            })
          }
        >
          <MaterialCommunityIcons style={s.iconAdd} name="calendar-plus" />
        </TouchableOpacity>

        <AgendaDayAddiction date={date} />
      </View>

      {sortedItems.map((i) => {
        return <AgendaDayItem i={i} key={"agenda-day-item" + i.id} />;
      })}
    </View>
  );
};

export { AgendaDay };
