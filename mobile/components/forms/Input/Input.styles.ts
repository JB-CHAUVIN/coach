import { StyleSheet } from "react-native";
import { FORM_STYLES } from "../../../constants/formStyles";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/fonts";

export const s = StyleSheet.create({
  container: {
    ...FORM_STYLES.inputContainer,
    paddingLeft: 20,
  },

  containerValid: {
    ...FORM_STYLES.inputContainerValid,
  },

  input: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: FONTS.SemiBold,
    flexGrow: 1,
  },

  inputEmpty: {
    ...FORM_STYLES.inputPlaceholder,
    position: 'absolute',
    left: 20,
  },

  icon: {
    ...FORM_STYLES.icon,
  },
});
