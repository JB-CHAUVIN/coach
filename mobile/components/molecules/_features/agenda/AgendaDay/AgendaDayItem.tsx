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
import { useAppSelector } from "../../../../../store/store";
import { ClubLogo } from "../../../../atoms/_features/club/ClubLogo";

type AgendaDayItemProps = {
  i: TYPE_EVENTS;
};

const AgendaDayItem: React.FC<AgendaDayItemProps> = (p) => {
  const { i } = p || {};

  const navigation = useNavigation();
  const { isLoading: isLoadingDone, handleEventDone } = useUpdateEvent();
  const isCoach = useAppSelector((s) => s?.user?.isCoach);
  const isClubSeance = i?.club?.id;

  const { isLoading, handleDelete } = useDeleteEvenet(i.id);
  const { done = false } = i || {};

  const seance = getEventByType(i.seance);
  const hasDetails = !!i.seance_variation || !!i.distance;

  const handleLongPress = () => {
    handleDelete();
  };

  if (i?.fake) {
    return null;
  }

  return (
    <TouchableOpacity
      style={s.buttonEvent}
      key={"event-" + i.id}
      // @ts-ignore
      onPress={() => navigation.navigate("modal-agenda-add", { item: i })}
      onLongPress={handleLongPress}
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

            {isClubSeance ? <ClubLogo style={s.imageClub} /> : null}

            <Text numberOfLines={1} style={s.textSeance}>
              {stringUcFirst(i.seance)}

              {hasDetails ? (
                " (" +
                stringConcat(
                  i?.seance_variation,
                  i?.distance
                    ? Math.round(i?.distance * 100) / 100 + "km"
                    : null,
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
          style={[
            !done && !isLoadingDone ? s.buttonNotDoneYet : {},
            s.buttonDone,
          ]}
          onPress={() => handleEventDone(i.id, !done)}
          disabled={isLoadingDone}
        >
          {isLoadingDone || isLoading ? (
            <ActivityIndicator />
          ) : (
            <MaterialCommunityIcons
              style={[s.iconCheck, done && s.iconCheckDone]}
              name={"check-bold"}
            />
          )}
        </TouchableOpacity>
      </View>
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

  // buttons
  buttonDone: {
    padding: 12,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
  },

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

  // images
  imageClub: {
    height: 20,
    width: 20,
    borderRadius: 20,
    marginHorizontal: 4,
  },
});
export { AgendaDayItem };
