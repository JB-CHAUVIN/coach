import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SIZES } from "../../../../../constants/sizes";
import { FONTS } from "../../../../../constants/fonts";
import { COLORS } from "../../../../../constants/colors";

const heightButton = 40;

export const s = StyleSheet.create({
  // containers
  containerDisableStrava: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: heightButton,
  },

  // image
  imageStrava: {
    width: 100,
  },

  imageStravaDisable: {
    width: 50,
    height: 20,
  },

  // buttons
  button: {
    backgroundColor: "#fc5200",
    height: heightButton,
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

  textButtonDisable: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: "white",
  },

  textDesc: {
    fontFamily: FONTS.Regular,
    fontSize: 14,
    color: COLORS.text,
  },
});
