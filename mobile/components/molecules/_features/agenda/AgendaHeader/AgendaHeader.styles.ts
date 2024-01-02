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

  containerSeeBallance: {
    zIndex: 10,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
  },

  containerStats: {
    height: 58,
  },

  containerGroupStats: {
    marginVertical: 10,
  },

  containerCharts: {
    marginLeft: -1 * SIZES.PADDING_PAGE,
    marginRight: -1 * SIZES.PADDING_PAGE,
    marginTop: 0,
    backgroundColor: COLORS.secondary,
  },

  containerStatsAnnual: {
    marginTop: 0,
    marginLeft: -1 * SIZES.PADDING_PAGE,
    marginRight: -1 * SIZES.PADDING_PAGE,
    padding: 20,
    backgroundColor: COLORS.secondary,
    height: "100%",
  },

  containerSubInfoStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerSubInfo: {
    flexDirection: "row",
  },

  // text
  text: {
    color: "white",
    fontSize: 14,
  },

  textSub: {
    color: "white",
    fontSize: 12,
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

  textValueSub: {
    fontFamily: FONTS.Bold,
    fontSize: 14,
  },

  textBallance: {
    fontFamily: FONTS.Regular,
    textDecorationLine: "underline",
    color: "white",
    fontSize: 14,
  },

  // icons
  iconBallance: {
    color: "white",
    fontSize: 18,
  },

  // buttons
  buttonSeeBallance: {
    padding: 4,
    flexDirection: "row",
  },
});
