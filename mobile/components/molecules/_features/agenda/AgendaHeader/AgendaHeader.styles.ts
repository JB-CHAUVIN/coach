import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../constants/sizes";
import { COLORS } from "../../../../../constants/colors";
import { FONTS } from "../../../../../constants/fonts";

export const s = StyleSheet.create({
  container: {
    margin: SIZES.PADDING_PAGE,
    padding: 20,
    borderRadius: 20,
    borderBottomRightRadius: 50,
    backgroundColor: COLORS.primary,
    marginBottom: 0,
    overflow: "hidden",
  },

  containerStats: {
    height: 58,
  },

  containerCharts: {
    marginLeft: -1 * SIZES.PADDING_PAGE,
    marginRight: -1 * SIZES.PADDING_PAGE,
    marginTop: 0,
    height: 330,
    backgroundColor: COLORS.secondary,
  },

  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // text
  text: {
    color: "white",
    fontSize: 14,
  },

  textTitle: {
    fontFamily: FONTS.Bold,
    color: "white",
    marginBottom: 5,
  },

  textValue: {
    fontFamily: FONTS.Bold,
    fontSize: 16,
  },

  textBallance: {
    fontFamily: FONTS.Regular,
    textDecorationLine: "underline",
    color: 'white',
    fontSize: 14,
  },

  // icons
  iconBallance: {
    color: "white",
    fontSize: 18,
  },

  // buttons
  buttonSeeBallance: {
    zIndex: 10,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
  },
});
