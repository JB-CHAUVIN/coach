import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { stringUcFirst } from "../../../../../utils/string";
import { useNavigation } from "expo-router";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { COLORS } from "../../../../../constants/colors";
import { FONTS } from "../../../../../constants/fonts";
import { Text } from "../../../../atoms/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUpdateEvent } from "./AgendaDay.hooks";
import { getEventByType } from "../Agenda/Agenda.utils";

type AgendaDayItemProps = {
  i: TYPE_EVENTS;
};

const AgendaDayItem: React.FC<AgendaDayItemProps> = (p) => {
  const { i } = p || {};

  const navigation = useNavigation();
  const { handleEventDone } = useUpdateEvent();

  const { done = false } = i || {};

  const seance = getEventByType(i.seance);

  // @ts-ignore
  return (
    <TouchableOpacity
      style={s.buttonEvent}
      key={"event-" + i.id}
      onPress={() => navigation.navigate("modal-agenda-add", { item: i })}
    >
      <View style={s.containerEvent}>
        <Text style={s.textTime}>{i.time}</Text>
        <View style={s.containerTextSeance}>
          {seance?.icon?.name ? (
            <MaterialCommunityIcons
              name={seance?.icon?.name}
              color={seance?.color}
              style={s.icon}
            />
          ) : null}

          <Text style={s.textSeance}>{stringUcFirst(i.seance)}</Text>

          {i.seance_variation ? (
            <Text style={s.textSeance}>{" (" + i.seance_variation + ")"}</Text>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        style={[!done && s.buttonNotDoneYet, s.buttonDone]}
        onPress={() => handleEventDone(i.id, !done)}
      >
        <MaterialCommunityIcons style={s.iconCheck} name={"check-bold"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  containerEvent: {
    flexGrow: 1,
  },

  containerTextSeance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  // buttons
  buttonDone: {
    padding: 12,
  },

  buttonEvent: {
    backgroundColor: COLORS.whiteTrue,
    margin: 6,
    borderRadius: 20,
    padding: 10,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonNotDoneYet: {
    opacity: 0.2,
  },

  // texts
  textDate: {
    flexDirection: "row",
    textTransform: "uppercase",
    fontSize: 15,
  },

  textTime: {
    fontFamily: FONTS.Medium,
    textTransform: "uppercase",
    fontSize: 14,
  },

  textSeance: {
    flexDirection: "row",
    fontFamily: FONTS.Regular,
    fontSize: 13,
  },

  // icons
  iconCheck: {
    fontSize: 20,
    color: COLORS.secondary,
  },

  icon: {
    fontSize: 20,
  }
});
export { AgendaDayItem };
