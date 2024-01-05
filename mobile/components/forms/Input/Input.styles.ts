import { StyleSheet } from "react-native";
import { FORM_STYLES, iconWidthForms } from "../../../constants/formStyles";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/fonts";
import { SCREEN_WIDTH, SIZES } from "../../../constants/sizes";

const inputPadding = 20;

export const s = StyleSheet.create({
  container: {
    ...FORM_STYLES.inputContainer,
    paddingLeft: inputPadding,
  },

  containerValid: {
    ...FORM_STYLES.inputContainerValid,
  },

  input: {
    fontSize: 18,
    color: COLORS.text,
    fontFamily: FONTS.SemiBold,
    flexGrow: 1,
    maxWidth:
      SCREEN_WIDTH -
      inputPadding -
      SIZES.PADDING_PAGE * 2 -
      10 -
      iconWidthForms,
    paddingRight: inputPadding,
  },

  inputEmpty: {
    ...FORM_STYLES.inputPlaceholder,
    position: "absolute",
    left: 20,
  },

  icon: {
    ...FORM_STYLES.icon,
  },

  // buttons
  buttonIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
});
