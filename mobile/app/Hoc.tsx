import React from "react";
import { useColorScheme } from "react-native";
import store, { persistor } from "../store/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { toastConfig } from "../constants/toasts";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
export const Hoc = (p: any) => {
  const { children } = p || {};
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1, opacity: 0.4 }}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <PersistGate loading={null} persistor={persistor}>
              <ActionSheetProvider>{children}</ActionSheetProvider>
            </PersistGate>
            <Toast config={toastConfig} />
          </ThemeProvider>
        </GestureHandlerRootView>
      </Provider>
    </GluestackUIProvider>
  );
};
