import { StyleSheet } from "react-native";
import { FORM_STYLES } from "../../../constants/formStyles";

export const s = StyleSheet.create({
  container: {
    ...FORM_STYLES.inputContainer,
  },

  containerValid: {
    ...FORM_STYLES.inputContainerValid,
  },

  // icon
  icon: {
    ...FORM_STYLES.icon,
  },

  iconDelete: {
    color: "grey",
    fontSize: 22,
  },

  // image
  image: {
    ...FORM_STYLES.icon,
    width: 50,
    height: 50,
  },

  // text
  textPlaceholder: {
    ...FORM_STYLES.inputPlaceholder,
    flexGrow: 1,
    paddingHorizontal: FORM_STYLES?.inputContainer?.marginVertical,
  },

  // buttons
  buttonDelete: {
    position: 'absolute',
    zIndex: 10,
    right: 0,
    bottom: -5,
    backgroundColor: "white",
    padding: 1,
    borderRadius: 10,
  },
});
