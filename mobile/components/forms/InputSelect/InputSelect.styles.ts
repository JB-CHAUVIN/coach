import { StyleSheet } from "react-native";
import { FORM_STYLES } from "../../../constants/formStyles";
import { color } from "ansi-fragments";
import { COLORS } from "../../../constants/colors";

export const s = StyleSheet.create({
  // containers
  containerListSelectHorizontal: {},

  // buttons
  button: {
    ...FORM_STYLES.inputContainer,
  },

  buttonSelectOption: {
    borderWidth: 0,
    padding: FORM_STYLES.inputContainer.marginVertical,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonSelectOptionHorizontal: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  buttonSelectOptionSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: FORM_STYLES.inputContainer.borderColor,
  },

  buttonSelectOptionSeparatorHorizontal: {
    height: "100%",
    width: 1,
    backgroundColor: FORM_STYLES.inputContainer.borderColor,
  },

  // text
  textSelectOption: {
    fontFamily: "UrbanistSemiBold",
    color: COLORS.text,
    flexGrow: 1,
  },

  textSelectOptionHorizontal: {
    textAlign: "center",
  },

  textPlaceholder: {
    fontFamily: "UrbanistRegular",
    color: COLORS.text,
    padding: FORM_STYLES.inputContainer.marginVertical,
    opacity: 0.6
  },

  // icons
  iconSelectedOption: {
    fontSize: 30,
    marginRight: FORM_STYLES.icon.marginRight,
  },
});
