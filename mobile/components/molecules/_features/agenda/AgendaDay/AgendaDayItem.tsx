import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { stringConcat, stringUcFirst } from "../../../../../utils/string";
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
import { SCREEN_WIDTH } from "../../../../../constants/sizes";
import { isLoading } from "expo-font";

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
  const { isLoading: isLoadingDone, handleEventDone } = useUpdateEvent();

  const { done = false } = i || {};

  const seance = getEventByType(i.seance);
  const hasDetails = !!i.seance_variation || !!i.distance;

  if(i?.fake) {
    return null;
  }

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

              <Text numberOfLines={1} style={s.textSeance}>
                {stringUcFirst(i.seance)}
                {hasDetails ? (
                  " (" +
                  stringConcat(
                    i?.seance_variation,
                    i?.distance ? i?.distance + "km" : null,
                    { separator: ", " },
                  ) +
                  ")"
                ) : (
                  <Text></Text>
                )}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[!done && !isLoadingDone ? s.buttonNotDoneYet : {}, s.buttonDone]}
            onPress={() => handleEventDone(i.id, !done)}
            disabled={isLoadingDone}
          >
            {isLoadingDone ? (
              <ActivityIndicator />
            ) : (
              <MaterialCommunityIcons style={[s.iconCheck, done && s.iconCheckDone]} name={"check-bold"} />
            )}
          </TouchableOpacity>
        </View>
      </SwipeableItem>
    </TouchableOpacity>
  );
};

const containerWidth = SCREEN_WIDTH - 130;
const s = StyleSheet.create({
  containerEvent: {},

  containerEventSwipeable: {
    flexDirection: "row",
  },

  containerTextSeance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    flexGrow: 1,
    width: containerWidth,
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
    width: 45,
    alignItems: "center",
    justifyContent: "center",
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
    marginRight: 25,
  },

  // icons
  iconCheck: {
    fontSize: 20,
    color: COLORS.secondary,
  },

  iconCheckDone: {
    color: COLORS.green,
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
