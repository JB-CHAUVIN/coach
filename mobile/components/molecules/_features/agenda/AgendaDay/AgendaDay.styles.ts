import { StyleSheet } from "react-native";
import { SIZES } from "../../../../../constants/sizes";
import { FONTS } from "../../../../../constants/fonts";
import {COLORS} from "../../../../../constants/colors";

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
    marginBottom: 8,
    marginTop: 8,
    backgroundColor: COLORS.features.itemAgenda,
    ...sharedStyles.borderRadius,
  },

  containerDate: {
    marginLeft: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems:"center"
  },

  // text
  textDate: {
    flexGrow: 1,
    alignItems:"center",
    justifyContent: "center",
  },

  textDayName: {
    fontFamily: FONTS.Bold,
  },
});
