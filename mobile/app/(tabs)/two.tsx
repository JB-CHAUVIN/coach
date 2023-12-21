import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SettingsConnectWithStrava } from "../../components/molecules/_features/connect/SettingsConnectWithStrava/SettingsConnectWithStrava";
import { SIZES } from "../../constants/sizes";
import { PHRASES } from "../../constants/phrases";
import { Text } from "../../components/atoms/Text";
import { useAppDispatch } from "../../store/store";
import { setToken, setUser } from "../../store/slices/userSlice";
import { COLORS } from "../../constants/colors";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // TODO : Add confirm modal
    dispatch(setUser(null));
    dispatch(setToken(null));
  };

  return (
    <View style={s.container}>
      <SettingsConnectWithStrava />

      <TouchableOpacity onPress={handleLogout}>
        <Text style={s.text}>{PHRASES.FR.LOGOUT}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.PADDING_PAGE,
    justifyContent: "space-between",
  },

  text: {
    textDecorationLine: "underline",
    color: COLORS.text,
    opacity: 0.7,
  },
});
