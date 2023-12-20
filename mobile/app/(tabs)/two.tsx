import { StyleSheet, View } from "react-native";
import { SettingsConnectWithStrava } from "../../components/molecules/_features/connect/SettingsConnectWithStrava/SettingsConnectWithStrava";
import { SIZES } from "../../constants/sizes";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SettingsConnectWithStrava />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.PADDING_PAGE,
  },
});
