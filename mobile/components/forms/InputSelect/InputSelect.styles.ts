import { StyleSheet } from "react-native";
import { FORM_STYLES } from "../../../constants/formStyles";
import { color } from "ansi-fragments";
import { COLORS } from "../../../constants/colors";
import {FONTS} from "../../../constants/fonts";

export const s = StyleSheet.create({
  // containers
  containerListSelect: {

  },

  containerListSelectHorizontal: {},

  // buttons
  button: {
    ...FORM_STYLES.inputContainer,
  },

  buttonValid: {
    ...FORM_STYLES.inputContainerValid,
  },

  buttonSelectOption: {
    borderWidth: 0,
    alignItems: "center",
    flexGrow: 1,
    flexDirection: "row",
    height: FORM_STYLES.inputContainer.height - FORM_STYLES.inputContainer.borderWidth,
    paddingLeft: FORM_STYLES.inputContainer.marginVertical,
  },

  buttonSelectOptionHorizontal: {
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: "center",
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
    flexGrow: 0,
  },

  textPlaceholder: {
    ...FORM_STYLES.inputPlaceholder,
    padding: FORM_STYLES.inputContainer.marginVertical,
    flexGrow: 1
  },

  // icons
  icon: {
    ...FORM_STYLES.icon
  },

  iconSelectedOption: {
    fontSize: 30,
    marginLeft: 5,
  },
});
