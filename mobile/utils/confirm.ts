import { Alert } from "react-native";
import { PHRASES } from "../constants/phrases";

export const confirm = (message: string, onConfirm: Function) => {
  Alert.alert(PHRASES.FR.CONFIRM, message, [
    {
      text: PHRASES.FR.CANCEL,
      style: "cancel",
    },
    {
      text: PHRASES.FR.OK,
      onPress: () => {
        onConfirm();
      },
    },
  ]);
};
