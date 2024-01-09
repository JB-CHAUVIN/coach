import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../../constants/sizes";
import { FONTS } from "../../../../../../constants/fonts";
import { COLORS } from "../../../../../../constants/colors";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.PADDING_PAGE,
  },

  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // texts
  textSectionHeader: {
    fontFamily: FONTS.SemiBold,
    fontSize: 18,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
});
