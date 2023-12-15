import { StyleSheet } from "react-native";
import {COLORS} from "./colors";


const paddingInput = 20;
const iconMarginRight = paddingInput / 2;

export const FORM_STYLES = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginVertical: paddingInput,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    height: 70,
    alignItems: "center",
  },

  inputContainerValid: {
    borderColor: COLORS.green,
  },

  icon: {
    color: "#888888",
    fontSize: 30,
    marginRight: iconMarginRight,
  }
});
