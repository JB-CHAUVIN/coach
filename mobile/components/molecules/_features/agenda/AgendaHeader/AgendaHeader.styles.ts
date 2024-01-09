import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../constants/sizes";
import { COLORS } from "../../../../../constants/colors";
import { FONTS } from "../../../../../constants/fonts";

const fill = {
  marginLeft: -1 * SIZES.PADDING_PAGE,
  marginRight: -1 * SIZES.PADDING_PAGE,
  marginBottom: -1 * SIZES.PADDING_PAGE,
};

export const s = StyleSheet.create({
  container: {
    margin: SIZES.PADDING_PAGE,
    padding: 20,
    borderRadius: 20,
    borderBottomRightRadius: 50,
    backgroundColor: COLORS.primary,
    overflow: "hidden",
    borderBottomRightRadis: 50,
    marginBottom: 10,
  },

  containerSeeBallance: {
    marginTop: 30,
    zIndex: 10,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    flexDirection: "row",
    ...fill,
  },

  containerStats: {

  },

  containerGroupStats: {
    marginVertical: 10,
  },

  containerCharts: {
    ...fill,
    backgroundColor: COLORS.secondary,
  },

  containerStatsAnnual: {
    ...fill,
    padding: 20,
    paddingTop: 30,
    backgroundColor: COLORS.secondary,
  },

  containerSubInfoStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 7,
  },

  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
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

export const agendaHeaderStyles = s;
