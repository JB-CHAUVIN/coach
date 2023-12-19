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
    paddingRight: 50,
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
});
