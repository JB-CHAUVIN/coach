import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS } from "../../../constants/fonts";
import { COLORS } from "../../../constants/colors";
import { Button } from "../Button";
import { PHRASES } from "../../../constants/phrases";
import { InputSubmit } from "../../forms/InputSubmit/InputSubmit";
import { buttonStyles } from "../../../constants/buttonStyles";
import { SCREEN_WIDTH, SIZES } from "../../../constants/sizes";

type EmptyPageProps = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  buttonTitle?: string;
};

const EmptyPage: React.FC<EmptyPageProps> = (p) => {
  const { icon, title, subtitle, onPress, buttonTitle } = p || {};

  return (
    <View style={s.container}>
      <MaterialCommunityIcons name={icon} style={s.icon} />
      <Text style={s.textTitle}>{title}</Text>
      <Text style={s.textSubTitle}>{subtitle}</Text>

      <TouchableOpacity style={s.button} onPress={onPress} disabled={false}>
        <Text style={s.textButton}>{PHRASES.FR.NO_CLUB_BUTTON}</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  // text
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.Bold,
  },

  textTitle: {
    fontSize: 25,
    fontFamily: FONTS.Bold,
    color: COLORS.text,
    textAlign: "center",
  },

  textSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.Regular,
    color: COLORS.text,
    textAlign: "center",
  },

  // button
  button: {
    ...buttonStyles.defaultStyles,
    width: SCREEN_WIDTH - SIZES.PADDING_PAGE * 2,
    marginTop: 20,
  },

  // icon
  icon: {
    fontSize: 50,
    color: COLORS.text,
  },
});

export { EmptyPage };
