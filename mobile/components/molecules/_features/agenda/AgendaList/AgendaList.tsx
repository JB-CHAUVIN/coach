import React from "react";
import { View, Text, FlatList } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { s } from "./AgendaList.styles";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { AgendaHeader } from "../AgendaHeader/AgendaHeader";
import {AgendaEmpty} from "../AgendaEmpty/AgendaEmpty";

type AgendaListProps = {
  agendaItems: {
    items: {
      [key: string]: TYPE_EVENTS[];
    };
  };
};

const AgendaList: React.FC<AgendaListProps> = (p) => {
  const { agendaItems: agenda } = p || {};

  const items = Object.values(agenda?.items);

  return (
    <View style={s.container}>
      <FlatList
        ListHeaderComponent={() => items.length > 0 ? <AgendaHeader /> : null}
        ListEmptyComponent={() => <AgendaEmpty />}
        data={items}
        renderItem={(item) => <AgendaDay item={item?.item} />}
      />
    </View>
  );
};

export { AgendaList };
