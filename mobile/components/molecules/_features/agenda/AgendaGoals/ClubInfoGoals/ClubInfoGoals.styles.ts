import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../../constants/sizes";
import { FONTS } from "../../../../../../constants/fonts";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.PADDING_PAGE,
    paddingTop: 0,
  },

  textAddGoals: {
    fontFamily: FONTS.Thin,
    textAlign: "center",
    fontSize: 14,
    marginVertical: 30,
  },
});
