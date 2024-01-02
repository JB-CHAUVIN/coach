import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SettingsConnectWithStrava } from "../../components/molecules/_features/connect/SettingsConnectWithStrava/SettingsConnectWithStrava";
import { SIZES } from "../../constants/sizes";
import { PHRASES } from "../../constants/phrases";
import { Text } from "../../components/atoms/Text";
import { useAppDispatch } from "../../store/store";
import { cleanUser } from "../../store/slices/userSlice";
import { COLORS } from "../../constants/colors";
import { SettingsAddiction } from "../../components/molecules/_features/settings/SettingsAddiction/SettingsAddiction";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    // TODO : Add confirm modal
    dispatch(cleanUser());
  };

  return (
    <View style={s.container}>
      <View>
        <SettingsConnectWithStrava />

        <View style={s.separator} />

        <SettingsAddiction />
      </View>

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

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    opacity: 0.3,
    marginVertical: 20,
  },

  text: {
    textDecorationLine: "underline",
    color: COLORS.text,
    opacity: 0.7,
  },
});
