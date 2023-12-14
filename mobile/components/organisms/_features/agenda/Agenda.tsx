import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Agenda as AgendaRNCal, LocaleConfig } from "react-native-calendars";
import { AgendaDay } from "../../../molecules/_features/agenda/AgendaDay/AgendaDay";
import { AgendaAddButton } from "../../../molecules/_features/agenda/AgendaAddButton";
import { setCurrentDate } from "../../../../store/slices/agendaSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../../store/store";
import moment from "moment";

type AgendaProps = {};

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

type AgendaItem = {
  text: string;
};

const Agenda: React.FC<AgendaProps> = (p) => {
  const {} = p || {};
  const dispatch = useAppDispatch();

  const items = [{}];

  return (
    <View style={s.container}>
      <AgendaRNCal
        renderDay={(day, item) => {
          return <AgendaDay day={day} item={item} />;
        }}
        refreshing={false}
        items={items}
        onDayPress={(day) => {
          dispatch(setCurrentDate(moment(day?.dateString).toISOString()));
        }}
        renderEmptyData={() => {
          return (
            <View>
              <Text>Salut</Text>
            </View>
          );
        }}
      />

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
