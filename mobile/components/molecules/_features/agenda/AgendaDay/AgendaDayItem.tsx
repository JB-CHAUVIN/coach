import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { stringUcFirst } from "../../../../../utils/string";
import { useNavigation } from "expo-router";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { COLORS } from "../../../../../constants/colors";
import { FONTS } from "../../../../../constants/fonts";
import { Text } from "../../../../atoms/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDeleteEvenet, useUpdateEvent } from "./AgendaDay.hooks";
import { getEventByType } from "../Agenda/Agenda.utils";
import SwipeableItem, {
  useSwipeableItemParams,
} from "react-native-swipeable-item";

type AgendaDayItemProps = {
  i: TYPE_EVENTS;
};

const UnderlayLeft = (p: { id: number }) => {
  const { id } = p || {};
  const { close } = useSwipeableItemParams<TYPE_EVENTS>();
  const { isLoading, handleDelete } = useDeleteEvenet(id);

  return (
    <View style={s.containerRemoveLeft}>
      <TouchableOpacity
        disabled={isLoading}
        style={s.buttonRemoveLeft}
        onPress={handleDelete}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <MaterialCommunityIcons
            name={"calendar-remove"}
            style={s.iconDelete}
            size={30}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const AgendaDayItem: React.FC<AgendaDayItemProps> = (p) => {
  const { i } = p || {};

  const navigation = useNavigation();
  const { handleEventDone } = useUpdateEvent();

  const { done = false } = i || {};

  const seance = getEventByType(i.seance);

  return (
    <TouchableOpacity
      style={s.buttonEvent}
      key={"event-" + i.id}
      // @ts-ignore
      onPress={() => navigation.navigate("modal-agenda-add", { item: i })}
    >
      <SwipeableItem
        key={"event-swipeable-" + i.id}
        item={i}
        renderUnderlayLeft={() => <UnderlayLeft id={i.id} />}
        snapPointsLeft={[40]}
      >
        <View style={s.containerEventSwipeable}>
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
                <Text style={s.textSeance}>
                  {" (" + i.seance_variation + ")"}
                </Text>
              ) : null}
            </View>
          </View>

          <TouchableOpacity
            style={[!done && s.buttonNotDoneYet, s.buttonDone]}
            onPress={() => handleEventDone(i.id, !done)}
          >
            <MaterialCommunityIcons style={s.iconCheck} name={"check-bold"} />
          </TouchableOpacity>
        </View>
      </SwipeableItem>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  containerEvent: {
    flexGrow: 1,
  },

  containerEventSwipeable: {
    flexDirection: "row",
  },

  containerTextSeance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  containerRemoveLeft: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
  },

  // buttons
  buttonDone: {
    padding: 12,
  },

  buttonRemoveLeft: {},

  buttonEvent: {
    backgroundColor: COLORS.whiteTrue,
    margin: 6,
    borderRadius: 20,
    padding: 10,
    borderTopRightRadius: 20,
    overflow: "hidden",
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
  },

  iconDelete: {
    fontSize: 30,
    color: COLORS.red,
  },
});
export { AgendaDayItem };
