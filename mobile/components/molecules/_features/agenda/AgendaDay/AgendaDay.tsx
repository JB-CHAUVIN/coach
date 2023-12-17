import React from "react";
import { View } from "react-native";
import { s } from "./AgendaDay.styles";
import { AgendaDayProps } from "./AgendaDay.props";
import moment from "moment";
import { stringUcFirst } from "../../../../../utils/string";
import { Text } from "../../../../atoms/Text";
import { orderBy } from "lodash";
import { TYPE_EVENTS } from "../../../../../../types/Events";

const AgendaDay: React.FC<AgendaDayProps> = (p) => {
  const { item } = p || {};

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
          <Text style={s.textDate}>{stringUcFirst(date.format("MMMM"))}</Text>
        </Text>
      </View>

      {sortedItems.map((i) => {
        return (
          <View style={s.containerEvent}>
            <Text style={s.textTime}>{i.time}</Text>
            <Text style={s.textSeance}>
              <Text style={s.textSeance}>{stringUcFirst(i.seance)}</Text>
              {i.seance_variation ? (
                <Text style={s.textSeance}>
                  {" (" + i.seance_variation + ")"}
                </Text>
              ) : null}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export { AgendaDay };
