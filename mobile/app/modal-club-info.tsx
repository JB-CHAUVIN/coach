import React, { useMemo } from "react";
import {ActivityIndicator, FlatList, SectionList, StyleSheet, View} from "react-native";
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
import {FONTS} from "../constants/fonts";
import {COLORS} from "../constants/colors";
import {useGetClubInfos} from "../components/molecules/_features/coach/Coach.hooks";

export default function ModalScreen() {
  const isPendingClub = useAppSelector(SELECTOR_USER_IS_PENDING_CLUB);
  const club = useAppSelector(SELECTOR_USER_CLUB);
  const { user } = useUser();
  // @ts-ignore
  const clubDetailed: TYPE_STRAPI_RESULT<TYPE_CLUB> =
    useAppSelector(SELECTOR_CLUBS_QUERY);

  // club
  const { isLoading: isLoadingClub } = useGetClubInfos();

  const usersClubSectionList = useMemo(() => {
    const groups = groupBy(
      clubDetailed?.attributes?.users?.data,
      "attributes.role2",
    );
    let res = [];
    for (let i in groups) {
      const group = groups[i];
      res.push({
        // @ts-ignore
        title: PHRASES?.FR?.["LABEL_ROLE2_" + i] || i,
        data: group,
      });
    }

    return res;
  }, [clubDetailed?.attributes?.users?.data]);

  if (isPendingClub && club) {
    return (
      <View style={s.container}>
        <Text>
          {phraseParse(PHRASES.FR.PENDING_CLUB_X, { name: club?.name })}
        </Text>
      </View>
    );
  }

  if(isLoadingClub) {
    return (
      <View style={s.containerLoading}>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }

  if (user.isCoach) {
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
    padding: SIZES.PADDING_PAGE,
  },

  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // texts
  textSectionHeader: {
    fontFamily: FONTS.SemiBold,
    fontSize: 18,
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
});
