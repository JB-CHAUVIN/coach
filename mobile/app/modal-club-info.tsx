import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { useAppSelector } from "../store/store";
import { Text } from "../components/atoms/Text";
import { phraseParse, PHRASES } from "../constants/phrases";
import { SIZES } from "../constants/sizes";
import {
  SELECTOR_USER_CLUB,
  SELECTOR_USER_IS_PENDING_CLUB,
} from "../store/selectors/selectorsUser";
import { useUser } from "../hooks/useUser";
import { SELECTOR_CLUBS_QUERY } from "../store/selectors/selectorClubs";
import { CoachUserValidate } from "../components/molecules/_features/coach/CoachUserValidate";
import { TYPE_STRAPI_RESULT } from "../../types/_Strapi";
import { TYPE_CLUB } from "../../types/Club";
import { groupBy } from "lodash";
import { FONTS } from "../constants/fonts";
import { COLORS } from "../constants/colors";
import { useGetClubInfos } from "../components/molecules/_features/coach/Coach.hooks";
import { ClubUserManagement } from "../components/molecules/_features/coach/Management/ClubUserManagement/ClubUserManagement";
import {Pages} from "../components/atoms/Pages";
import {ClubSettings} from "../components/molecules/_features/coach/Management/ClubSettings/ClubSettings";

export default function ModalScreen() {
  const isPendingClub = useAppSelector(SELECTOR_USER_IS_PENDING_CLUB);
  const club = useAppSelector(SELECTOR_USER_CLUB);
  const { user } = useUser();

  if (isPendingClub && club) {
    return (
      <View style={s.container}>
        <Text>
          {phraseParse(PHRASES.FR.PENDING_CLUB_X, { name: club?.name })}
        </Text>
      </View>
    );
  }

  if (user.isCoach) {
    return (
      <View style={s.container}>
        <Pages sectionsName={[PHRASES.FR.CLUB_USER_MANAGEMENT, PHRASES.FR.CLUB_SETTINGS]}>
          <ClubUserManagement />
          <ClubSettings />
        </Pages>
      </View>
    );
  }

  return (
    <View>
      <Text></Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
