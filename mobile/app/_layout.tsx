import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import { Hoc } from "./Hoc";
import { useUser } from "../hooks/useUser";

require("../config/reactotron");

moment.locale("fr");

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    UrbanistBlack: require("../assets/fonts/Urbanist-Black.ttf"),
    UrbanistBlackItalic: require("../assets/fonts/Urbanist-BlackItalic.ttf"),
    UrbanistBold: require("../assets/fonts/Urbanist-Bold.ttf"),
    UrbanistBoldItalic: require("../assets/fonts/Urbanist-BoldItalic.ttf"),
    UrbanistExtraBold: require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    UrbanistExtraBoldItalic: require("../assets/fonts/Urbanist-ExtraBoldItalic.ttf"),
    UrbanistExtraLight: require("../assets/fonts/Urbanist-ExtraLight.ttf"),
    UrbanistExtraLightItalic: require("../assets/fonts/Urbanist-ExtraLightItalic.ttf"),
    UrbanistItalic: require("../assets/fonts/Urbanist-Italic.ttf"),
    UrbanistLight: require("../assets/fonts/Urbanist-Light.ttf"),
    UrbanistLightItalic: require("../assets/fonts/Urbanist-LightItalic.ttf"),
    UrbanistMedium: require("../assets/fonts/Urbanist-Medium.ttf"),
    UrbanistMediumItalic: require("../assets/fonts/Urbanist-MediumItalic.ttf"),
    UrbanistRegular: require("../assets/fonts/Urbanist-Regular.ttf"),
    UrbanistSemiBold: require("../assets/fonts/Urbanist-SemiBold.ttf"),
    UrbanistSemiBoldItalic: require("../assets/fonts/Urbanist-SemiBoldItalic.ttf"),
    UrbanistThin: require("../assets/fonts/Urbanist-Thin.ttf"),
    UrbanistThinItalic: require("../assets/fonts/Urbanist-ThinItalic.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Hoc>
      <RootLayoutNav />
    </Hoc>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="modal-agenda-add"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
