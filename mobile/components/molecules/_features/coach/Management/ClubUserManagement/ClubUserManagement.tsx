import React from "react";
import { ClubUserManagementI } from "./ClubUserManagement.props";
import { ActivityIndicator, SectionList, View } from "react-native";
import { s } from "./ClubUserManagement.styles";
import { Text } from "../../../../../atoms/Text";
import { CoachUserValidate } from "../../CoachUserValidate";
import { useClubUserManagement } from "./ClubUserManagement.hooks";

export const ClubUserManagement = (p: ClubUserManagementI) => {
  const { isLoadingClub, usersClubSectionList } = useClubUserManagement();

  if (isLoadingClub) {
    return (
      <View style={s.containerLoading}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={s.container}>
      <SectionList
        sections={usersClubSectionList}
        renderItem={({ item }) => <CoachUserValidate item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={s.textSectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};
