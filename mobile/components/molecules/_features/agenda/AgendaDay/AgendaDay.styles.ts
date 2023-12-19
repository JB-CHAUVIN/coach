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

  // text
  textDate: {},

  textDayName: {
    fontFamily: FONTS.Bold,
  },
});
