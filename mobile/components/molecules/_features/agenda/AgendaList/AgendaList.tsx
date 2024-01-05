import React from "react";
import { View, Text, FlatList } from "react-native";
import { AgendaDay } from "../AgendaDay/AgendaDay";
import { s } from "./AgendaList.styles";
import { TYPE_EVENTS } from "../../../../../../types/Events";
import { AgendaHeader } from "../AgendaHeader/AgendaHeader";
import { AgendaHeaderCoach } from "../AgendaHeaderCoach/AgendaHeaderCoach";
import { AgendaEmpty } from "../AgendaEmpty/AgendaEmpty";
import { useAppSelector } from "../../../../../store/store";

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

  const isCoach = useAppSelector((s) => s?.user?.isCoach);
  const HeaderComponent = isCoach ? AgendaHeaderCoach : AgendaHeader;

  return (
    <View style={s.container}>
      <FlatList
        ListHeaderComponent={() =>
          items.length > 0 ? <HeaderComponent /> : null
        }
        ListEmptyComponent={() => <AgendaEmpty />}
        data={items}
        renderItem={(item) => <AgendaDay item={item?.item} />}
      />
    </View>
  );
};

export { AgendaList };
