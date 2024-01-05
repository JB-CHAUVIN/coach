import React from "react";
import { View } from "react-native";
import { Text } from "../../../../atoms/Text";
import { phraseParse, PHRASES } from "../../../../../constants/phrases";
import { useAppSelector } from "../../../../../store/store";
import { agendaHeaderStyles } from "../AgendaHeader/AgendaHeader.styles";
import { s } from "./AgendaHeaderCoach.styles";

type AgendaHeaderCoachProps = {};

const AgendaHeaderCoach: React.FC<AgendaHeaderCoachProps> = (p) => {
  const {} = p || {};
  const username = useAppSelector((s) => s?.user?.item?.username);

  return (
    <View style={agendaHeaderStyles.container}>
      <Text style={agendaHeaderStyles.text}>
        {phraseParse(PHRASES.FR.WELCOME_COACH_X, { name: username })}
      </Text>
      <Text style={[agendaHeaderStyles.textSub, s.textSub]}>
        {PHRASES.FR.WELCOME_MORE_INFO}
      </Text>
    </View>
  );
};

export { AgendaHeaderCoach };
