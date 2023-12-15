import React from "react";
import { StyleSheet, View } from "react-native";
import { Agenda as AgendaApp } from "../../../molecules/_features/agenda/Agenda/Agenda";
import { AgendaAddButton } from "../../../molecules/_features/agenda/AgendaAddButton";

type AgendaProps = {};

type AgendaItem = {
  text: string;
};

const Agenda: React.FC<AgendaProps> = (p) => {
  const {} = p || {};

  return (
    <View style={s.container}>
      <AgendaApp />

      <View style={s.containerFloattingButton}>
        <AgendaAddButton />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerFloattingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export { Agenda };
