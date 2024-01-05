import { Redirect, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import { useUser } from "../../hooks/useUser";
import { PHRASES } from "../../constants/phrases";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS } from "../../constants/fonts";
import { SCREENS, useAppNavigation } from "../../hooks/useAppNavigation";

const headerTitleStyle = {
  fontFamily: FONTS.Medium,
  color: "#505050",
  fontSize: 20,
};

export default function TabLayout() {
  const { isLoggedIn, user } = useUser();
  const navigation = useAppNavigation();

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

  const onPress = () => {
    if (user?.item?.club?.id) {
      navigation.navigate(SCREENS.MODAL.clubInfo);
      return;
    }
    navigation.navigate(SCREENS.MODAL.clubFind);
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitleStyle,
          title: PHRASES.FR.TAB1_TITLE,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={30} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons
                name="account-group"
                size={25}
                color={COLORS.secondary}
                style={{ marginRight: 15, opacity: 1 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerTitleStyle,
          title: PHRASES.FR.TAB2_TITLE,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-cog"
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
