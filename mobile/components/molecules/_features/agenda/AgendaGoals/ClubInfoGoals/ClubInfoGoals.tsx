import React from "react";
import { FlatList, View } from "react-native";
import { s } from "./ClubInfoGoals.styles";
import { ClubInfoGoalsProps } from "./ClubInfoGoals.props";
import { useAppSelector } from "../../../../../../store/store";
import { SELECTOR_CLUBS_GOALS_QUERY } from "../../../../../../store/selectors/selectorClubs";
import { ClubGoalItem } from "./ClubGoalItem";
import {PHRASES} from "../../../../../../constants/phrases";
import {Text} from "../../../../../atoms/Text";

const ClubInfoGoalsNonMemo: React.FC<ClubInfoGoalsProps> = (p) => {
  const {} = p || {};

  const goals = useAppSelector(SELECTOR_CLUBS_GOALS_QUERY);

  return (
    <View style={s.container}>
      <FlatList
        data={goals}
        renderItem={({ item }) => <ClubGoalItem item={item} />}
        ListFooterComponent={() => <Text style={s.textAddGoals}>{PHRASES.FR.ADD_MORE_GOALS}</Text>}
      />
    </View>
  );
};

const ClubInfoGoals = React.memo(ClubInfoGoalsNonMemo, () => true);

export { ClubInfoGoals };
