import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { TYPE_USER } from "../../../../../types/User";
import { TYPE_STRAPI_RESULT } from "../../../../../types/_Strapi";
import { Text } from "../../../atoms/Text";
import { COLORS } from "../../../../constants/colors";
import { FONTS } from "../../../../constants/fonts";
import Checkbox from "expo-checkbox";
import { API_ENDPOINTS, useQuery } from "../../../../hooks/useQuery";
import { useGetClubInfos } from "./Coach.hooks";

type CoachUserValidateProps = {
  item?: TYPE_STRAPI_RESULT<TYPE_USER>;
};

const CoachUserValidate: React.FC<CoachUserValidateProps> = (p) => {
  const { item } = p || {};

  const [value, setValue] = React.useState(!item?.attributes?.pendingJoinClub);

  const { handleQuery, isLoading } = useQuery(API_ENDPOINTS.CLUB_VALIDATE_USER);

  const handlePress = () => {
    const newValue = !value;
    setValue(newValue);
    handleQuery("POST", {
      body: {
        userToValidateId: item?.id,
        validate: newValue,
      },
      onSuccess: () => {},
    });
  };

  return (
    <View style={s.container}>
      <Text style={s.textAthlete}>{item?.attributes?.username}</Text>

      {isLoading ? <ActivityIndicator style={s.containerLoading} /> : null}

      <Checkbox
        value={value}
        onValueChange={handlePress}
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

  containerLoading: {
    marginHorizontal: 10,
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
