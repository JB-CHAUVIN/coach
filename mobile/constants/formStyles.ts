import { StyleSheet } from "react-native";
import { COLORS } from "./colors";
import { FONTS } from "./fonts";

const paddingInput = 20;
const iconMarginRight = paddingInput / 2;
export const iconWidthForms = 30;

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

  inputPlaceholder: {
    fontSize: 16,
    fontFamily: FONTS.Regular,
    color: COLORS.text,
    opacity: 0.6,
  },

  inputContainerValid: {
    borderColor: COLORS.green,
  },

  icon: {
    color: "#888888",
    fontSize: 30,
    marginRight: iconMarginRight,
    width: iconWidthForms,
    height: iconWidthForms,
    alignItems: "center",
    justifyContent: "center",
  },
});
