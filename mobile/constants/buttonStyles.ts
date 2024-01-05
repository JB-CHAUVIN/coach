import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const buttonStyles = StyleSheet.create({
  defaultStyles: {
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
