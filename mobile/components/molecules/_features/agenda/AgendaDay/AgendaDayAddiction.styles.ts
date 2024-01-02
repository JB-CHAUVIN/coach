import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/colors";

export const s = StyleSheet.create({
  containerAddiction: {
    flexDirection: "row",
    alignItems: "center",
  },

  container: {
    marginRight: 17,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  containerNotDetoxified: {
    opacity: 0.5,
  },

  containerDetoxified: {
    opacity: 1,
  },

  // icons
  iconDetoxified: {
    color: COLORS.green,
  },
  iconAddiction: {
    color: COLORS.green,
    fontSize: 18,
  },

  // buttons
  buttonAddiction: {
    padding: 2,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
