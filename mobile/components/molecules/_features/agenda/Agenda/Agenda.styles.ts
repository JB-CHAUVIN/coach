import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // @ts-ignore
    ...StyleSheet.absoluteFill,
  },
});
