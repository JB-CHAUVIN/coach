import React from "react";
import { View, Text, FlatList } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { s } from "./AgendaList.styles";
import { TYPE_EVENTS } from "../../../../../../types/Events";

type AgendaListProps = {
  agendaItems: {
    items: {
      [key: string]: TYPE_EVENTS[];
    };
  };
};

const AgendaList: React.FC<AgendaListProps> = (p) => {
  const { agendaItems: agenda } = p || {};

  return (
    <View style={s.container}>
      <FlatList
        data={Object.values(agenda?.items)}
        renderItem={(item) => <AgendaDay item={item?.item} />}
      />
    </View>
  );
};

export { AgendaList };
