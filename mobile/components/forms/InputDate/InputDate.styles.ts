import { StyleSheet } from "react-native";
import { FORM_STYLES } from "../../../constants/formStyles";

export const s = StyleSheet.create({
  // containers
  containerInput: {
    flexGrow: 1,
    alignItems: "flex-start",
  },

  // buttons
  button: {
    ...FORM_STYLES.inputContainer,
  },

  // icons
  icon: {
    ...FORM_STYLES.icon,
  }
});
