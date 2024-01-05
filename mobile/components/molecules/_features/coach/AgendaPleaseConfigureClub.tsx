import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { EmptyPage } from "../../../atoms/Classics/EmptyPage";
import { PHRASES } from "../../../../constants/phrases";
import { SCREENS, useAppNavigation } from "../../../../hooks/useAppNavigation";

type AgendaPleaseConfigureClubProps = {};

const AgendaPleaseConfigureClub: React.FC<AgendaPleaseConfigureClubProps> = (
  p,
) => {
  const {} = p || {};
  const navigation = useAppNavigation();
  return (
    <View style={s.container}>
      <EmptyPage
        icon={"account-group"}
        title={PHRASES.FR.NO_CLUB}
        subtitle={PHRASES.FR.NO_CLUB_SUBTITLE}
        onPress={() => navigation.navigate(SCREENS.MODAL.clubAdd)}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export { AgendaPleaseConfigureClub };
