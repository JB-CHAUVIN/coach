import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../constants/sizes";
import { FONTS } from "../../../../../constants/fonts";
import { COLORS } from "../../../../../constants/colors";

const sharedStyles = StyleSheet.create({
  borderRadius: {
    borderRadius: 20,
    borderTopRightRadius: 50,
    padding: 10,
  },
});

export const s = StyleSheet.create({
  container: {
    margin: SIZES.PADDING_PAGE,
    marginBottom: 4,
    backgroundColor: "rgb(249,221,177)",
    ...sharedStyles.borderRadius,
  },

  containerDate: {
    marginLeft: 10,
    marginVertical: 10,
  },

  containerEvent: {
    backgroundColor: COLORS.whiteTrue,
    margin: 6,
    ...sharedStyles.borderRadius,
    borderTopRightRadius: 20,
  },

  // text
  textDayName: {
    fontFamily: FONTS.Bold,
  },

  textDate: {
    flexDirection: "row",
    textTransform: "uppercase",
    fontSize: 15,
  },

  textTime: {
    fontFamily: FONTS.Medium,
    textTransform: "uppercase",
    fontSize: 14,
  },

  textSeance: {
    flexDirection: "row",
    fontFamily: FONTS.Regular,
    fontSize: 13,
    marginTop: 3,
  },
});
