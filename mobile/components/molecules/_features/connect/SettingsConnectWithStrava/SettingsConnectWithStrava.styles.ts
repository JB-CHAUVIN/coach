import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SIZES } from "../../../../../constants/sizes";
import { FONTS } from "../../../../../constants/fonts";
import { COLORS } from "../../../../../constants/colors";

export const s = StyleSheet.create({
  // image
  imageStrava: {
    width: 100,
  },

  // buttons
  button: {
    backgroundColor: "#fc5200",
    height: 40,
    width: SCREEN_WIDTH - SIZES.PADDING_PAGE * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
      marginVertical: 10,
  },

  // texts
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
