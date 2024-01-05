import React from "react";
import { View, StyleSheet } from "react-native";
import { TYPE_USER } from "../../../../../types/User";
import { TYPE_STRAPI_RESULT } from "../../../../../types/_Strapi";
import { Text } from "../../../atoms/Text";
import { COLORS } from "../../../../constants/colors";
import { FONTS } from "../../../../constants/fonts";
import Checkbox from "expo-checkbox";

type CoachUserValidateProps = {
  item?: TYPE_STRAPI_RESULT<TYPE_USER>;
};

const CoachUserValidate: React.FC<CoachUserValidateProps> = (p) => {
  const { item } = p || {};

  return (
    <View style={s.container}>
      <Text style={s.textAthlete}>{item?.attributes?.username}</Text>

      <Checkbox
        value={!item?.attributes?.pendingJoinClub}
        onValueChange={() => alert('TODO - Validate')}
        color={COLORS.primary}
      />
    </View>
  );
};

const s = StyleSheet.create({
  // containers
  container: {
    flexDirection: "row",
  },
  // texts
  textAthlete: {
    flexGrow: 1,
    fontSize: 16,
    fontFamily: FONTS.Regular,
    color: COLORS.text,
  },
});

export { CoachUserValidate };
