import React from "react";
import { AgendaEmptyI } from "./AgendaEmpty.props";
import { View } from "react-native";
import { s } from "./AgendaEmpty.styles.ts";
import {Text} from "../../../../atoms/Text";
import {PHRASES} from "../../../../../constants/phrases";

export const AgendaEmpty = (p: AgendaEmptyI) => {
  return (
    <View style={s.container}>
      <Text style={s.text}>{PHRASES.FR.AGENDA_EMPTY}</Text>
    </View>
  );
};
