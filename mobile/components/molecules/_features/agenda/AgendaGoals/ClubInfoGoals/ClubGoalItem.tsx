import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TYPE_EVENTS } from "../../../../../../../types/Events";
import { TYPE_STRAPI_RESULT } from "../../../../../../../types/_Strapi";
import { Text } from "../../../../../atoms/Text";
import { stringUcFirst } from "../../../../../../utils/string";
import moment from "moment/moment";
import { FONTS } from "../../../../../../constants/fonts";
import { COLORS } from "../../../../../../constants/colors";
import { useDeleteEvenet } from "../../AgendaDay/AgendaDay.hooks";
import { useClub } from "../../../../../../hooks/useClub";

type ClubGoalItemProps = {
  item: TYPE_STRAPI_RESULT<TYPE_EVENTS>;
};

const ClubGoalItem: React.FC<ClubGoalItemProps> = (p) => {
  const { item } = p || {};

  const date = moment(item?.attributes?.date);
  const { handleDelete, isLoading: isLoadingDelete } = useDeleteEvenet(item.id);
  const { handleQuery: handleFetchClub, isLoading } = useClub();

  const handleLongPress = () => {
    handleDelete(() => {
      handleFetchClub("GET");
    });
  };

  return (
    <TouchableOpacity style={s.container} onLongPress={handleLongPress}>
      {isLoadingDelete || isLoading ? <ActivityIndicator /> : null}

      <View style={s.containerRow}>
        <Text style={[s.text, s.textDate]}>
          <Text style={[s.text, s.textDate]}>
            {date ? stringUcFirst(date.format("dddd")) : null}
          </Text>
          <Text style={[s.text, s.textDate, s.textDayName]}>
            {date ? stringUcFirst(date.format(" DD ")) : null}
          </Text>
          <Text style={[s.text, s.textDate, s.textDayName]}>
            {date ? stringUcFirst(date.format("MMMM ")) : null}
          </Text>
          <Text style={[s.text, s.textDate, s.textDayName]}>
            {date ? stringUcFirst(date.format("YYYY")) : null}
          </Text>
        </Text>
        <Text style={[s.text, s.textTime]}>{item.attributes.time}</Text>
      </View>

      <View style={s.containerRow}>
        <Text style={[s.text, s.textEvent]}>{item.attributes.description}</Text>
        <Text style={[s.text]}>{item.attributes.seance_variation}</Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: COLORS.features.itemAgenda,
  },

  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  // texts
  text: {
    color: COLORS.text,
  },
  textDate: {},

  textEvent: {
    fontFamily: FONTS.Bold,
  },

  textTime: {
    fontFamily: FONTS.LightItalic,
    fontSize: 12,
  },

  textDayName: {
    fontFamily: FONTS.SemiBold,
  },
});

export { ClubGoalItem };
