// App.jsx
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { FONTS } from "./fonts";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 22,
        fontFamily: FONTS.Bold,
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: FONTS.SemiBold,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 22,
        fontFamily: FONTS.Bold,
      }}
      text2Style={{
        fontSize: 18,
        fontFamily: FONTS.SemiBold,
      }}
    />
  ),
};
