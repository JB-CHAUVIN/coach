import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";
import { FORM_STYLES } from "../../../constants/formStyles";

export const s = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: FORM_STYLES.inputContainer.borderRadius,
    height: FORM_STYLES.inputContainer.height,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  text: {
    fontFamily: "UrbanistBold",
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
  },

  loading: {
    marginLeft: 5,
  }
});
