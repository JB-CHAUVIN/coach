import { Redirect, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import { useUser } from "../../hooks/useUser";
import { PHRASES } from "../../constants/phrases";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS } from "../../constants/fonts";
import { SCREENS, useAppNavigation } from "../../hooks/useAppNavigation";
import { StyleSheet } from "react-native";
import { TYPE_STRAPI_RESULT } from "../../../types/_Strapi";
import { TYPE_CLUB } from "../../../types/Club";
import { useAppSelector } from "../../store/store";
import { SELECTOR_CLUBS_QUERY } from "../../store/selectors/selectorClubs";
import { ClubLogo } from "../../components/atoms/_features/club/ClubLogo";

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
            <TouchableOpacity style={s.buttonClub} onPress={onPress}>
              <ClubLogo style={{ height: 30, width: 30 }}>
                <MaterialCommunityIcons
                  name="account-group"
                  size={25}
                  color={COLORS.secondary}
                  style={s.iconGroup}
                />
              </ClubLogo>
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

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonClub: {
    marginHorizontal: 10,
  },

  iconGroup: { opacity: 1 },
});
