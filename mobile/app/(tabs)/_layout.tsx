import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { COLORS } from "../../constants/colors";
import { useUser } from "../../hooks/useUser";
import { PHRASES } from "../../constants/phrases";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS } from "../../constants/fonts";

const headerTitleStyle = {
  fontFamily: FONTS.Medium,
  color: '#505050',
  fontSize: 20,
};

export default function TabLayout() {
  const { isLoggedIn, user } = useUser();

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

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
            <MaterialCommunityIcons
              name="calendar-heart"
              color={color}
              size={30}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={COLORS.white}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
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
