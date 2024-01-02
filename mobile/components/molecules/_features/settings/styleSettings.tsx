import { StyleSheet } from "react-native";
import { FONTS } from "../../../../constants/fonts";
import { COLORS } from "../../../../constants/colors";

export const styleSettings = StyleSheet.create({
  // text
  textTitle: {
    fontFamily: FONTS.SemiBold,
    fontSize: 20,
  },

  textDesc: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.text,
  },
});
